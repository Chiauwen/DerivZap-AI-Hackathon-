import pickle
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer


def ui_analyse(age_days, action, time_takes):
    with open("UI.pkl", "rb") as file:
        model = pickle.load(file)

    df = pd.read_csv("UI.csv")

    vectorizer = CountVectorizer()  # Remove tokenizer, let CountVectorizer handle it
    vectorizer.fit(df["action"])

    new_data = pd.DataFrame(
        {"age_days": age_days, "action": action, "time_takes": time_takes}
    )

    action_features = vectorizer.transform(new_data["action"]).toarray()
    action_df = pd.DataFrame(
        action_features, columns=vectorizer.get_feature_names_out()
    )

    new_data_final = pd.concat(
        [new_data[["age_days", "time_takes"]], action_df], axis=1
    )

    prediction = model.predict(new_data_final)
    # print("Predicted Label:", prediction[0])
    
    return prediction

# ui_analyse([3], ["deposit,trade in,trade out,withdraw"], [60])