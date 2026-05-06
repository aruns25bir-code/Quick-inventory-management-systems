import { PackageCheck } from "lucide-react";

function AuthSide({ type }) {
  return (
    <div className="auth-side">
      <div className="auth-logo">
        <PackageCheck size={26} />
        <span>Inventory</span>
      </div>

      <div className="auth-copy">
        <h1>{type === "login" ? "Welcome Back!" : "Create your Inventory Account"}</h1>
        <p>
          {type === "login"
            ? "Login to manage your inventory and stock efficiently."
            : "Start managing products and stock updates in MongoDB."}
        </p>
      </div>

      <div className="warehouse-art">
        <div className="rack rack-one"></div>
        <div className="rack rack-two"></div>
        <div className="clipboard">✓<br/>✓<br/>✓</div>
        <div className="box box-one"></div>
        <div className="box box-two"></div>
      </div>
    </div>
  );
}

export default AuthSide;
