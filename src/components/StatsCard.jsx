import React from 'react';

const StatsCard = ({ title, value, icon: IconComponent, variant = 'default', subtitle = null }) => {
  const variants = {
    success: {
      bgColor: 'bg-white',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-gray-900',
      titleColor: 'text-gray-600',
      subtitleColor: 'text-green-600'
    },
    warning: {
      bgColor: 'bg-white',
      borderColor: 'border-yellow-200',
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      valueColor: 'text-gray-900',
      titleColor: 'text-gray-600',
      subtitleColor: 'text-yellow-600'
    },
    danger: {
      bgColor: 'bg-white',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      valueColor: 'text-gray-900',
      titleColor: 'text-gray-600',
      subtitleColor: 'text-red-600'
    },
    default: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-50',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      titleColor: 'text-gray-600',
      subtitleColor: 'text-gray-500'
    }
  };

  const style = variants[variant];

  return (
    <div className={`${style.bgColor} border ${style.borderColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${style.titleColor} mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${style.valueColor} mb-1`}>{value}</p>
          {subtitle && (
            <p className={`text-xs font-medium ${style.subtitleColor}`}>{subtitle}</p>
          )}
        </div>
        <div className={`${style.iconBg} ${style.iconColor} p-3 rounded-lg`}>
          <IconComponent className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;