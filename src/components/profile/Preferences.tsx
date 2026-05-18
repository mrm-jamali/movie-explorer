export default function Preferences() {
  return (
  

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        
        {/* Theme */}
        <div className="mb-10">
          <h4 className="mb-4 text-xl font-semibold text-gray-800">
            Theme
          </h4>

          <div className="flex flex-wrap gap-4">
            {["Light", "Dark", "System"].map((theme) => (
              <button
                key={theme}
                className="rounded-2xl border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100"
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

      </div>
  
  );
}