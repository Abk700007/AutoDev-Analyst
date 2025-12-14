from oumi import evaluators

def evaluate_summary(summary: str):
    evaluator = evaluators.LlmRubricEvaluator(
        rubric="""
        Evaluate the summary on these criteria:
        - Accuracy
        - Quality
        - Completeness
        - Clarity
        Score from 1 to 10.
        """,
        model="gpt-4o-mini"
    )

    result = evaluator.evaluate(
        input_text=summary
    )
    
    print("Evaluation Result:")
    print(result)
    return result

if __name__ == "__main__":
    print("Paste the summary to evaluate:\n")
    summary = ""
    lines = []
    print("Enter summary (finish with an empty line):")
    while True:
        line = input()
        if line.strip() == "":
            break
        lines.append(line)

    summary = "\n".join(lines)
    evaluate_summary(summary)
