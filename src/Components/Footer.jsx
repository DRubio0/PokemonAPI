export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="text-center mt-5">
          <p>&copy; <b> {currentYear}</b> Daniel Alberto Rubio Cárcamo - KODIGO</p>
        </div>
      </div>
    </footer>
  );
}
