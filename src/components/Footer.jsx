export default function Footer() {
  return (
    <footer
      style={{
        background: '#080706',
        padding: '80px 24px 40px',
        color: '#F8F5F2'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 40,
            flexWrap: 'wrap',
            marginBottom: 60,
            borderBottom: '1px solid rgba(248,245,242,0.1)',
            paddingBottom: 60
          }}
        >
          <div style={{ maxWidth: 400 }}>
            <h3
              style={{
                fontFamily: 'var(--font-cormorant,serif)',
                fontSize: 28,
                fontWeight: 600,
                marginBottom: 12
              }}
            >
              Devarsh Jain
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-jost, sans-serif)',
                fontSize: 15,
                color: 'rgba(248,245,242,0.7)',
                lineHeight: 1.7,
                marginBottom: 24
              }}
            >
              Crafting cinematic wedding films that tell your unique love story.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a
                href="https://instagram.com/contentkapitara"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-sq"
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(248,245,242,0.2)',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  color: '#F8F5F2'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A27E';
                  e.currentTarget.style.background = 'rgba(201,162,126,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(248,245,242,0.2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" />
                </svg>
              </a>
              <a
                href="mailto:hello@devarshjain.com"
                className="focus-sq"
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(248,245,242,0.2)',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  color: '#F8F5F2'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A27E';
                  e.currentTarget.style.background = 'rgba(201,162,126,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(248,245,242,0.2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'monospace',
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A27E',
                marginBottom: 20
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {['Home', 'Work', 'Packages', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      fontFamily: 'var(--font-jost, sans-serif)',
                      fontSize: 14,
                      color: 'rgba(248,245,242,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#C9A27E';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(248,245,242,0.7)';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap'
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'rgba(248,245,242,0.5)',
              letterSpacing: '0.15em'
            }}
          >
            © {new Date().getFullYear()} Devarsh Jain. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a
              href="#"
              style={{
                fontFamily: 'monospace',
                fontSize: 10,
                color: 'rgba(248,245,242,0.4)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#C9A27E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(248,245,242,0.4)';
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                fontFamily: 'monospace',
                fontSize: 10,
                color: 'rgba(248,245,242,0.4)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#C9A27E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(248,245,242,0.4)';
              }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
