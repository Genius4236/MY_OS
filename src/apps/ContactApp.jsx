function ContactApp() {
  return (
    <div className="text-green-400 space-y-5">
      <h1 className="text-2xl font-bold">
        CONTACT
      </h1>

      <div>
        <p>Email:</p>

        <a
          href="mailto:khizer@example.com"
          className="text-green-300 underline"
        >
          khizer@example.com
        </a>
      </div>

      <div>
        <p>GitHub:</p>

        <a
          href="#"
          className="text-green-300 underline"
        >
          github.com/khizer
        </a>
      </div>

      <div>
        <p>LinkedIn:</p>

        <a
          href="#"
          className="text-green-300 underline"
        >
          linkedin.com/in/khizer
        </a>
      </div>
    </div>
  );
}

export default ContactApp;