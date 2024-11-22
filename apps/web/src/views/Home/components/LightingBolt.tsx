const LightningBolt = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        padding: '0.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1080px',
          position: 'relative',
          aspectRatio: '1',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, transparent 50%, #000 100%)',
            zIndex: 2,
          }}
        />
        <img
          src="/boltz.webp"
          alt="Lightning Bolt Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            display: 'block',
          }}
        />
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            max-width: 540px;
          }
        }
      `}</style>
    </div>
  )
}

export default LightningBolt
