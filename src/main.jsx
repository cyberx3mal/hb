import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

function Root() {
	useEffect(() => {
			if (import.meta.env.PROD && "serviceWorker" in navigator) {
			const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
			navigator.serviceWorker.register(swUrl).catch(() => {});
			} else if (!import.meta.env.PROD && "serviceWorker" in navigator) {
				// Ensure no SW controls dev to prevent stale caches
				navigator.serviceWorker.getRegistrations().then(regs => {
					regs.forEach(r => r.unregister());
				});
		}
	}, []);
	return <App />;
}

createRoot(document.getElementById("root")).render(<Root />);