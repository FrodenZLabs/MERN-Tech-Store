from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from preprocess_data import preprocess
from dynamic_pricing import calculate_dynamic_price, calculate_monthly_repayment

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

preprocess_data = joblib.load("preprocessor_credit_score.pkl")
cs_model = joblib.load("lr_score_model.pkl")
cr_model = joblib.load("lr_risk_model.pkl")

# Endpoint to predict credit score
@app.route("/predict_score", methods=["POST"])
def predict_score():
    try:
        # Parse user input JSON
        user_input = request.json

        # Convert JSON to DataFrame
        input_df = pd.DataFrame([user_input])

        # Perform any necessary preprocessing here
        inputs = preprocess_data.transform(input_df)
        # Predict using the loaded model
        rf_pred = cs_model.predict(inputs)

        # Return the prediction
        response = {'Credit Score Prediction': rf_pred.tolist()}
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to predict credit risk
@app.route("/predict_risk", methods=["POST"])
def predict_risk():
    try:
        # Parse user input JSON
        user_input = request.json

        # Convert JSON to DataFrame
        input_df = pd.DataFrame([user_input])

        # Perform any necessary preprocessing here
        inputs = preprocess(input_df)
        # Predict using the loaded model
        rf_pred = cr_model.predict(inputs)

        # Return the prediction
        response = {'Credit Risk Prediction': rf_pred.tolist()}
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Endpoint to predict dynamic price and monthly payments
@app.route("/dynamic_price", methods=["POST"])
def dynamic_price():
    try:
        # Parse user input JSON
        user_input = request.json

        # Extract input fields
        base_price = user_input.get("base_price")
        inventory_stock = user_input.get("inventory_stock")
        risk_level = user_input.get("risk_level")
        income_in_kes = user_input.get("income_in_kes")
        guarantor_credit_score = user_input.get("guarantor_credit_score")
        duration_months = user_input.get("duration_months")

        # Validate required inputs
        if None in [base_price, inventory_stock, risk_level, income_in_kes, guarantor_credit_score, duration_months]:
            return jsonify({"error": "Missing required input fields"}), 400

        # Calculate dynamic price
        dynamic_price_value = calculate_dynamic_price(base_price, inventory_stock, risk_level, income_in_kes, guarantor_credit_score)

        # Calculate monthly repayment
        monthly_repayment = calculate_monthly_repayment(dynamic_price_value, risk_level, duration_months)

        # Return the response as JSON
        return jsonify({
            "dynamic_price": dynamic_price_value,
            "monthly_repayment": monthly_repayment
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    