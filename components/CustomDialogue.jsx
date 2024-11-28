export default function CustomDialogue({
  children,
  title,
  description,
  TiggerSection,
  isOpen,
  closeModal,
}) {
  return (
    <>
      {TiggerSection}

      {/* Modal */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`} role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p className="py-2 pb-4 text-lg">{description}</p>
          <div>{children}</div>

          {/* Close button inside modal */}
          <div className="modal-action">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
