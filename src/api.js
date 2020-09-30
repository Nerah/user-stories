const API_URL = "https://api.trello.com/1";

export const API = {
  getUserBoards(key, token) {
    return fetch(`${API_URL}/members/me/boards?key=${key}&token=${token}`, {
      method: 'GET'
    })
        .then(res => {
          if (res.status === 200) {
            return res.json()
          }
          throw new Error("User information is not correct...");
        })
        .then(data => data.filter(board => !board.closed))
        .then(data => {
          return data.map(board => {
            return {
              id: board.id,
              name: board.name
            }
          });
        })
  },
  getBoardLists(boardId, key, token) {
    return fetch(`${API_URL}/boards/${boardId}/lists?key=${key}&token=${token}`, {
      method: 'GET'
    })
        .then(res => {
          // ok
          if (res.status === 200) {
            return res.json()
          }
          throw new Error("Board information is not correct...");
        })
        .then(data => data.filter(board => !board.closed))
        .then(data => {
          return data.map(list => {
            return {
              id: list.id,
              name: list.name
            }
          })
        })
  },
  getListCards(listId, key, token) {
    return fetch(`${API_URL}/lists/${listId}/cards?key=${key}&token=${token}`, {
      method: 'GET'
    })
        .then(res => {
          // ok
          if (res.status === 200) {
            return res.json()
          }
          throw new Error("List information is not correct...");
        })
        .then(data => {
          return data.map(list => {
            return {
              id: list.id,
              name: list.name,
              description: list.desc
            }
          })
        })
  },
  createCard(listId, name, description, key, token) {
    return fetch(`${API_URL}/cards?name=${name}&desc=${description}&idList=${listId}&pos=top&key=${key}&token=${token}`, {
      method: 'POST'
    })
        .then(res => {
          // ok
          if (res.status === 200) {
            return res.json()
          }
          throw new Error("Card information is not correct...");
        })
        .then(data => data.id)
        .catch(err => console.log(err))
  },
  updateCard(cardId, name, description, key, token) {
    return fetch(`${API_URL}/cards/${cardId}?name=${name}&desc=${description}&key=${key}&token=${token}`, {
      method: 'PUT'
    })
        .then(res => {
          // ok
          if (res.status === 200) {
            return res.json()
          }
          throw new Error("Card information is not correct...");
        })
        .then(data => console.log(data.name))
        .catch(err => console.log(err))
  },
  deleteCard(cardId, key, token) {
    return fetch(`${API_URL}/cards/${cardId}?key=${key}&token=${token}`, {
      method: 'DELETE'
    })
        .then(res => {
          // ok
          if (res.status === 200) {
            return res.json()
          }
          throw new Error("Card information is not correct...");
        })
        .then(data => console.log(data.name))
        .catch(err => console.log(err))
  }
}
