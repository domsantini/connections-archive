import { NotificationType } from "../context/notificationContext";
import { motion, AnimatePresence } from "framer-motion";

function NotificationShelf({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  return (
    <div className="absolute top-0 space-y-2 z-[9999]">
      <AnimatePresence>
        {notifications.map(({ timestamp, message }) => (
          <motion.div
            initial={{ y: 0, scale: 1 }}
            animate={{ y: 50, scale: 1 }}
            exit={{ scale: 0 }}
            layout
            key={timestamp}
            className="flex flex-col items-center px-4 py-2 bg-black rounded-full text-white"
          >
            <p>
              {message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default NotificationShelf;
