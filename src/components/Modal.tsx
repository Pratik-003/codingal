import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function Modal(props: ModalProps) {
  const { isOpen, onClose, onConfirm } = props;
  const [selectedReason, setSelectedReason] = useState("");
  const [subReason, setSubReason] = useState("");
  const [otherText, setOtherText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[350px] md:max-w-[700px]">
        <h2 className="text-lg font-semibold mb-4">
          Select a reason to end class
        </h2>

        {/* Main Options */}
        <div className="space-y-3">
          {[
            { label: "Class completed", value: "completed" },
            { label: "Class interrupted/aborted", value: "interrupted" },
          ].map(({ label, value }) => (
            <label
              key={value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="reason"
                className="hidden"
                checked={selectedReason === value}
                onChange={() => setSelectedReason(value)}
              />
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  selectedReason === value
                    ? "bg-red-500 border-red-500"
                    : "border-gray-400"
                }`}
              >
                {selectedReason === value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-lg">{label}</span>
            </label>
          ))}
        </div>

        {/* Sub-reasons for "Interrupted" */}
        <div
          className={`transition-all duration-300 ${
            selectedReason === "interrupted"
              ? "opacity-100 max-h-96 mt-3"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="mt-2 space-y-2 pl-8">
            {[
              "Student didn't show up for the class.",
              "Student didn't show any interest.",
              "Student got disconnected.",
              "I got disconnected.",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sub-reason"
                  className="hidden"
                  checked={subReason === option}
                  onChange={() => setSubReason(option)}
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                    subReason === option
                      ? "bg-red-500 border-red-500"
                      : "border-gray-400"
                  }`}
                >
                  {subReason === option && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}

            {/* "Other reason" Option */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sub-reason"
                className="hidden"
                checked={subReason === "Other reason"}
                onChange={() => setSubReason("Other reason")}
              />
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                  subReason === "Other reason"
                    ? "bg-red-500 border-red-500"
                    : "border-gray-400"
                }`}
              >
                {subReason === "Other reason" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span>Other reason</span>
            </label>

            <div
              className={`transition-all duration-300 ${
                subReason === "Other reason"
                  ? "opacity-100 max-h-40 mt-2"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <textarea
                className="w-full p-2 border rounded mt-2"
                placeholder="Type here..."
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-red-500 text-white px-6 py-3 rounded text-lg"
            onClick={onConfirm}
          >
            End Class
          </button>
          <button
            className="bg-gray-300 px-6 py-3 rounded text-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
