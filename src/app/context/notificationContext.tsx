"use client";
import React from "react";
import { isEqual } from "lodash";

export interface NotificationType {
  timestamp: number;
  message: string;
}

interface NotificationContextType {
  notifications: NotificationType[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  handleSettingNotifications: (maxCorrect: number, currentGuess: string[], guessHistory: string[][]) => true | false;
}

export const NotificationContext = React.createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = React.useState<NotificationType[]>([]);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (notifications.length > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setNotifications((notifications) => 
          notifications.filter(
            ({ timestamp }) => timestamp + (5 * 1000) > Date.now()
          )
        )
      }, 1000)
    } else if (notifications.length === 0 && intervalRef.current)  {
      clearInterval(intervalRef.current)
      intervalRef.current = null;
    }
    // return () => clearInterval(interval)
    
  }, [notifications]);

  function handleSettingNotifications(maxCorrect: number, currentGuess: string[], guessHistory: string[][]) {
    
    if (maxCorrect === 3 && guessHistory.some(guess => isEqual(guess, currentGuess))) {
      setNotifications((prevNotifications) => {
        const nextNotification = [
          ...prevNotifications,
          {
            timestamp: Date.now(),
            message: 'Already guessed, but one away.'
          }
        ]
        return nextNotification;
      })  
      return true;
    }
    
    if (maxCorrect === 3) {
      setNotifications((prevNotifications) => {
        const nextNotification = [
          ...prevNotifications,
          {
            timestamp: Date.now(),
            message: 'Close.. One away.'
          }
        ]
        return nextNotification;
      })  
      
      return false
    }
    
    if (guessHistory.some(guess => isEqual(guess, currentGuess))) {
      setNotifications((prevNotifications) => {
        const nextNotification = [
          ...prevNotifications,
          {
            timestamp: Date.now(),
            message: 'Already guessed!'
          }
        ]
        return nextNotification;
      })  
      
      return true;
    }
    
    return false;
  }
  
  const value = React.useMemo(() => {
    return { notifications, setNotifications, handleSettingNotifications };
  }, [notifications]);
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}



export function useNotificationContext() {
  const notificationContext = React.useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error(
      "useNotificationContext must be used inside the NotificationContextProvider"
    );
  }

  return notificationContext;
}
