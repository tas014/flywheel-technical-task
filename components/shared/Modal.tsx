interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({children, onClose}: Props) { 
  return <section onClick={onClose} className="w-full h-full fixed inset-0 bg-black/50 flex items-center justify-center">
    <div onClick={(e) => e.stopPropagation()} className="p-5 bg-white rounded-lg relative">
      <button className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-(--button-color) hover:bg-(--button-highlight) text-(--text-primary) font-medium transition-colors" onClick={onClose}>x</button>
      <div>
        {children}
      </div>
    </div>
  </section>
}