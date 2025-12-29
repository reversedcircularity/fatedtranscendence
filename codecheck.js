    const EXPECTED_HEX_HASH = "cbbd3323df5d200363dc7a807d0dccb9bc34f8a76f244993e13041778f53198a";

    function bufToHex(buffer) {
      const hexCodes = [];
      const view = new DataView(buffer);
      for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16).padStart(8, '0');
        hexCodes.push(stringValue);
      }
      return hexCodes.join('');
    }

    async function sha256Hex(text) {
      const enc = new TextEncoder();
      const data = enc.encode(text);
      const digest = await crypto.subtle.digest('SHA-256', data);
      return bufToHex(digest);
    }

    async function checkHashed() {
      const val = document.getElementById('codebox').value.trim();
      const hex = await sha256Hex(val);
      const msg = document.getElementById('message');
      if (hex === EXPECTED_HEX_HASH) {
        msg.textContent = "yeah it's correct";
      } else {
        msg.textContent = "lol nope";
      }
    }

    document.getElementById('authbutton').addEventListener('click', checkHashed);
    document.getElementById('codebox').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkHashed();
    });