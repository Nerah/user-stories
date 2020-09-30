import {utilsGeneral} from "../../utils";

export const utilsCard = {
  CARD_SIZE: 200,
  randomPositionInZone() {
    const element = document.getElementsByClassName("cards-container")[0];
    const zone = element.getBoundingClientRect();
    const zoneBoundaries = {
      min: {
        x: zone.left,
        y: zone.top
      },
      max: {
        x: zone.right - this.CARD_SIZE,
        y: zone.bottom - this.CARD_SIZE
      }
    }
    return {
      x: utilsGeneral.random.getRandomInt(zoneBoundaries.min.x, zoneBoundaries.max.x),
      y: utilsGeneral.random.getRandomInt(zoneBoundaries.min.y, zoneBoundaries.max.y)
    }
  }
}
