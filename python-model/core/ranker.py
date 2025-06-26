from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def rank_resumes(jd_text, resume_texts):
    """
    Ranks resumes based on their cosine similarity to the job description.

    Args:
        jd_text (str): The cleaned text of the job description.
        resume_texts (list of str): A list of cleaned resume texts.

    Returns:
        list of float: A list of similarity scores.
    """
    # Combine the job description and resumes into one list for vectorization
    all_texts = [jd_text] + resume_texts
    
    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_texts)
    
    # Calculate cosine similarity between the JD (first document) and all resumes
    # The JD's vector is tfidf_matrix[0:1]
    # The resume vectors are tfidf_matrix[1:]
    similarity_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    
    # cosine_similarity returns a 2D array, so we flatten it to a list
    return similarity_scores.flatten().tolist()

