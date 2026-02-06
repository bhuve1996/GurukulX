-- Expand short_body for feed cards so shorts show more useful info (~80–100 words).
-- Run after 000, 002. Updates items 1–6 (Basics + Libraries).

UPDATE content_items SET short_body = 'Python is the standard language for AI and machine learning. It has readable syntax, a huge ecosystem (NumPy, Pandas, PyTorch, TensorFlow, scikit-learn), and strong community support. Most research and production ML code is written in Python. Learning Python first gives you the foundation for data science and ML. You will use it for data loading, model training, and deployment. Start here before moving to data or models—everything else in this track builds on Python.'
WHERE id = '1';

UPDATE content_items SET short_body = 'Use clear variable names so your code is easy to read. Prefer type hints: name: str, count: int, price: float. They help tools and other developers understand your code. Start with simple types and add hints as you go. Good naming and types make debugging easier and prevent many bugs. In ML you will deal with arrays and data structures; clear names and types keep your notebooks and scripts maintainable.'
WHERE id = '2';

UPDATE content_items SET short_body = 'Create a .py file and run it with: python file.py. Use print() to see output. Keep scripts small and run them often to catch errors early. This habit will save you time as you move to larger projects. The Python interpreter and docs are your friends. Once you can run a script, you are ready to try Jupyter notebooks for experiments and then move on to data and ML libraries.'
WHERE id = '3';

UPDATE content_items SET short_body = 'NumPy gives you fast arrays and numerical math in Python. Use ndarray for vectors and matrices; vectorize loops instead of writing for-loops. It is the foundation for Pandas and most ML libraries. Once you are comfortable with NumPy, data manipulation and model code will make much more sense. Operations like shape, reshape, broadcasting, and dot products are used everywhere in ML—from data prep to training loops.'
WHERE id = '4';

UPDATE content_items SET short_body = 'Pandas DataFrames are tables: rows and columns. Load CSV with read_csv(), filter with boolean indexing, and aggregate with groupby(). Essential for data prep before ML. Most real-world data comes in as tables; Pandas is the standard way to clean and explore it in Python. You will use it to load datasets, handle missing values, and turn raw data into features for models. Master the basics before moving to the Data phase.'
WHERE id = '5';

UPDATE content_items SET short_body = 'Matplotlib is low-level plotting: plot, scatter, bar. Seaborn is higher-level and great for distributions and correlations: histplot, pairplot, heatmap. Use both for EDA and reports. Visualizing data before modeling helps you spot problems and choose the right approach. In the Data phase you will use these to explore datasets, check for outliers, and present findings. A quick chart often explains more than a table.'
WHERE id = '6';
