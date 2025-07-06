import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the SubscriptionField component for testing
function SubscriptionField({ tier }) {
  let subscriptionLabel;
  switch (tier) {
    case "BASE_CLIENT":
    case "GENERAL_CLIENT":
    case "SPECIFIC_CLIENT":
      subscriptionLabel = "Active";
      break;
    case "NO_SUBSCRIPTION":
    default:
      subscriptionLabel = "Inactive";
  }
  return <div className="subscription-tier">{subscriptionLabel}</div>;
}

describe('SubscriptionField', () => {
  test('should display "Active" for BASE_CLIENT', () => {
    render(<SubscriptionField tier="BASE_CLIENT" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('should display "Active" for GENERAL_CLIENT', () => {
    render(<SubscriptionField tier="GENERAL_CLIENT" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('should display "Active" for SPECIFIC_CLIENT', () => {
    render(<SubscriptionField tier="SPECIFIC_CLIENT" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('should display "Inactive" for NO_SUBSCRIPTION', () => {
    render(<SubscriptionField tier="NO_SUBSCRIPTION" />);
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
