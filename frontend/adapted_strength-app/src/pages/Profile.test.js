import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the SubscriptionField component for testing
function SubscriptionField({ tier }) {
  let subscriptionLabel;
  switch (tier) {
    case "ACTIVE":
      subscriptionLabel = "Active";
      break;
    case "INACTIVE":
    default:
      subscriptionLabel = "Inactive";
  }
  return <div className="subscription-tier">{subscriptionLabel}</div>;
}

describe('SubscriptionField', () => {
  test('should display "Active" for ACTIVE', () => {
    render(<SubscriptionField tier="ACTIVE" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('should display "Inactive" for INACTIVE', () => {
    render(<SubscriptionField tier="INACTIVE" />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  test('should display "Inactive" for undefined tier', () => {
    render(<SubscriptionField tier={undefined} />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  test('should display "Inactive" for null tier', () => {
    render(<SubscriptionField tier={null} />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  test('should display "Inactive" for unknown tier', () => {
    render(<SubscriptionField tier="UNKNOWN_TIER" />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });
});
