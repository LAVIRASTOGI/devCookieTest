import LockIcon from "../quiz/Icons/LockIcon";

const { memo } = require("react");

const PaymentButton = memo(({ buttonName }) => (
  <>
    <LockIcon />
    <span className="mt-1">{buttonName}</span>
  </>
));
export default PaymentButton;
