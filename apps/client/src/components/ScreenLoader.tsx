export default function ScreenLoader() {
  return (
    <div
      id="loader-wrapper"
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]"
    >
      <div className="loader"></div>
      <p className="loading-text font-poppins mt-4">Finding you the best hotels...</p>
    </div>
  );
}
