Qualtrics.SurveyEngine.addOnload(function() {
    // Set ExperimentCondition based on the current block
    const experimentCondition = "Familiar-UnCoherent"; // Adjust for each block
    Qualtrics.SurveyEngine.setEmbeddedData("ExperimentCondition", experimentCondition);
});

Qualtrics.SurveyEngine.addOnload(function() {
  this.getQuestionContainer().style.display = "none";
});



