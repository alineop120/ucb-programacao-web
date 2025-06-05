import React, { useState } from 'react';

function QrCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQr = async () => {
    if (!text.trim()) {
      setError('Digite algo para gerar o QR Code');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3001/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
      } else {
        setError(data.error || 'Erro desconhecido');
      }
    } catch (e) {
      setError('Erro na conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qr-generator-container">
      <h2>Gerador de QR Code</h2>
      <textarea
        rows={4}
        placeholder="Digite o texto para gerar QR Code"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={generateQr} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar QR Code'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {qrCode && (
        <div>
          <img src={qrCode} alt="QR Code" />
          <br />
          <a href={qrCode} download="qrcode.png">Baixar QR Code</a>
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;
