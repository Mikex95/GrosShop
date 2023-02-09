import "./Verification.css";

const SignUp = () => {
  return (
    <div className="verification">
      <div className="verification-up">
        <div className="verification-headline">
          <h2>Create New Account</h2>
          <p>Enter Your details to create account</p>
        </div>
        <form className="verification-form">
          <input type="email" placeholder="Type you E-Mail" />
          <input type="password" placeholder="Choose a password" />
          <p>Button placeholder</p>
        </form>
      </div>
      <div className="verification-down">
        <p>Already have an Account?</p>
        <span>Sign In</span>
      </div>
    </div>
  );
};

export default SignUp;
