import joblib
import pandas as pd

def preprocess(dataFrame):
    encoder = joblib.load("encoder.pkl")
    categorical_columns = dataFrame.select_dtypes(include=['object']).columns.tolist()
    one_hot_encoded = encoder.transform(dataFrame[categorical_columns]).astype(int)
    one_hot_df = pd.DataFrame(one_hot_encoded, columns=encoder.get_feature_names_out(categorical_columns))
    data_to_scale = dataFrame.drop(['marital_status', 'education_level', 'relationship_to_student', 'employment_status', 'existing_loans', 'financial_counseling'], axis=1)

    scaler = joblib.load("scaler.pkl")

    scaled_data = scaler.transform(data_to_scale)
    scaled_df = pd.DataFrame(scaled_data, columns=['age', 'no_of_dependants', 'income_in_kes', 'additional_income', 'employment_length', 
    'guarantor_credit_score', 'outstanding_loan_amount', 'monthly_repayment_amount', 'monthly_expenses', 'missed_payments_last_year'])

    boolean_columns = ['existing_loans', 'financial_counseling']
    boolean_columns = dataFrame[boolean_columns].astype(int)

    features = pd.concat([scaled_df, one_hot_df, boolean_columns],axis=1)

    return features