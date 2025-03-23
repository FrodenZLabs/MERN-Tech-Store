def calculate_dynamic_price(base_price, inventory_stock, risk_level, income_in_kes, guarantor_credit_score):
    # Inventory stock modifier (10% increase for low stock, decrease for high stock)
    if inventory_stock < 10:  # Low stock
        inventory_factor = 1.1
    elif inventory_stock > 50:  # High stock
        inventory_factor = 0.99
    else:
        inventory_factor = 1.0  # Normal stock
    
    # Risk level modifier (low-risk = cheaper price, high-risk = higher price)
    if risk_level == 'Low':
        credit_risk_factor = 1.05  # 10% discount for low risk
    elif risk_level == 'Medium':
        credit_risk_factor = 1.15  # No change for medium risk
    else:  # High risk
        credit_risk_factor = 1.2  # 20% premium for high risk
    
    # Financial capability modifier (based on income)
    if income_in_kes > 100000:  # High income
        income_factor = 1.5  # 15% discount
    else:  # Low income
        income_factor = 1.1  # 10% higher price for low income
    
    # Guarantor’s credit score modifier (high guarantor score = cheaper price)
    if guarantor_credit_score > 700:
        guarantor_credit_factor = 1.02  # 15% discount for high guarantor score
    else:
        guarantor_credit_factor = 1.1  # 10% higher price for low guarantor score

    # Calculate the dynamic price
    dynamic_price = base_price * inventory_factor * credit_risk_factor * income_factor * guarantor_credit_factor
    return round(dynamic_price, 2)

# Function to calculate the monthly repayment based on dynamic price, risk level, and duration in months
def calculate_monthly_repayment(price, risk_level, duration_months):
    # Interest rate based on risk level
    if risk_level == 'Low':
        interest_rate = 0.05
    elif risk_level == 'Medium':
        interest_rate = 0.10
    else:  # High risk
        interest_rate = 0.15

    # Calculate total amount to be paid after interest
    total_amount = price * (1 + interest_rate)
    # Monthly repayment calculation
    monthly_repayment = total_amount / duration_months
    return round(monthly_repayment, 2)