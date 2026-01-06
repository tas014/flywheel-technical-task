interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
  return (
    <section
      onClick={onClose}
      className="w-full h-full fixed inset-0 bg-black/50 flex items-center justify-center z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-5 bg-(--bg-translucent) rounded-lg relative min-w-1/3"
      >
        <button
          className="cursor-pointer absolute top-4 right-4 hover:text-(--button-color) text-(--text-primary) font-medium text-3xl transition-colors"
          onClick={onClose}
          title="Close"
        >
          x
        </button>
        <div>{children}</div>
      </div>
    </section>
  );
}
