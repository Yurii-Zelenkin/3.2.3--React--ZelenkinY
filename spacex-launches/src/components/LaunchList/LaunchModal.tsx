import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Launch } from "../../types/launch";

interface LaunchModalProps {
  launch: Launch | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LaunchModal({ launch, isOpen, onClose }: LaunchModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !launch) {
    return null;
  }

  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Крестик закрытия */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#666",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f0f0f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          ×
        </button>

        <h2
          style={{
            marginTop: 0,
            marginBottom: "1.5rem",
            textAlign: "left",
            paddingRight: "2rem",
          }}
        >
          {launch.mission_name}
        </h2>

        {launch.links?.mission_patch && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <img
              src={launch.links.mission_patch}
              alt={launch.mission_name}
              style={{
                height: "120px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <div
          style={{
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0.75rem 0" }}>
            <strong>Rocket:</strong> {launch.rocket?.rocket_name}
          </p>
          <p style={{ margin: "0.75rem 0" }}>
            <strong>Launch Year:</strong> {launch.launch_year}
          </p>
          <p style={{ margin: "0.75rem 0" }}>
            <strong>Date:</strong>{" "}
            {new Date(launch.launch_date_utc).toLocaleDateString()}
          </p>
        </div>

        {launch.details && (
          <div
            style={{
              marginBottom: "1.5rem",
              textAlign: "left",
            }}
          >
            <strong>Details:</strong>
            <p
              style={{
                marginTop: "0.5rem",
                lineHeight: "1.5",
              }}
            >
              {launch.details}
            </p>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#228be6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
