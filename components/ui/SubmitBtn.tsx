interface SubmitBtnprops {
    label: string;
    isDisable: boolean;
}

const SubmitBtn = ({ label, isDisable }: SubmitBtnprops) => {
  return (
    <button
    type="submit"
    disabled={isDisable}
    className={`login-btn
    text-white text-lg font-bold bg-primary flex w-full py-4 my-4 justify-center rounded-4xl shadow-md shadow-primary/50 duration-200
    hover:opacity-70 hover:cursor-pointer hover:duration-200
    active:shadow-none active:opacity-30
    ${isDisable
    ? "opacity-30"
    : ""}`}>
        {label}
    </button>
  )
}

export default SubmitBtn;
