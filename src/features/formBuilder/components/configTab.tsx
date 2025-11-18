import useConfiguration from "../hooks/useConfiguration";

export default function ConfigTab() {
  const { configurationState, handleTitleChange, handleDescriptionChange } =
    useConfiguration();

  return (
    <div className="p-4 flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={configurationState.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={configurationState.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
      </div>
    </div>
  );
}
