import React from 'react';

export default function UserKeysInputs({config, handleChange}) {
  return (
      <>
        <label htmlFor="key">User key</label>
        <input type="text" id="key" value={config.key} onChange={handleChange}/>
        <label htmlFor="token">User token</label>
        <input type="text" id="token" value={config.token} onChange={handleChange}/>
      </>
  );
}
