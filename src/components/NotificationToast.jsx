import React, { useState, useEffect } from 'react';
import { NOTIFICATION_TYPES } from '../constants/notifications';
import '../styles/notifications.css';

const NotificationToast = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300); // Match the animation duration
  };

  const getToastStyles = () => {
    const baseStyles = 'fixed top-4 right-4 z-50 max-w-md w-full sm:w-96 shadow-lg rounded-lg border transition-all duration-300 ease-in-out transform';
    
    const typeStyles = {
      [NOTIFICATION_TYPES.SUCCESS]: 'bg-green-50 border-green-200 text-green-800',
      [NOTIFICATION_TYPES.ERROR]: 'bg-red-50 border-red-200 text-red-800',
      [NOTIFICATION_TYPES.WARNING]: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      [NOTIFICATION_TYPES.INFO]: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    const visibilityStyles = isVisible && !isExiting 
      ? 'translate-x-0 opacity-100' 
      : 'translate-x-full opacity-0';

    return `${baseStyles} ${typeStyles[notification.type]} ${visibilityStyles}`;
  };

  const getIconComponent = () => {
    const iconStyles = 'h-6 w-6 flex-shrink-0';
    
    switch (notification.type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return (
          <svg className={`${iconStyles} text-green-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case NOTIFICATION_TYPES.ERROR:
        return (
          <svg className={`${iconStyles} text-red-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case NOTIFICATION_TYPES.WARNING:
        return (
          <svg className={`${iconStyles} text-yellow-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case NOTIFICATION_TYPES.INFO:
      default:
        return (
          <svg className={`${iconStyles} text-blue-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIconComponent()}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium leading-5">
              {notification.message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150"
              onClick={handleClose}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar for auto-dismiss */}
      <div className="h-1 bg-gray-200 rounded-b-lg overflow-hidden">
        <div 
          className={`h-full transition-all ease-linear notification-progress-bar ${
            notification.type === NOTIFICATION_TYPES.SUCCESS ? 'bg-green-400' :
            notification.type === NOTIFICATION_TYPES.ERROR ? 'bg-red-400' :
            notification.type === NOTIFICATION_TYPES.WARNING ? 'bg-yellow-400' :
            'bg-blue-400'
          }`}
          style={{
            '--duration': `${notification.duration}ms`
          }}
        />
      </div>
    </div>
  );
};

export default NotificationToast;