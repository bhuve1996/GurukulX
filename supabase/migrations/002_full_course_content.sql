-- Full AI/ML course: topics for all phases + content items (summaries, images, links).
-- Run after 000_content_tables.sql. Uses ON CONFLICT DO NOTHING so safe to re-run.

-- Topics: phase 1 (Python) already has 1=Basics, 2=Libraries. Add topics for phases 2–9.
INSERT INTO topics (id, phase_id, slug, name, "order", estimated_days) VALUES
  ('3', '2', 'data-loading', 'Data loading', 0, 2),
  ('4', '2', 'eda', 'Exploratory data analysis', 1, 3),
  ('5', '2', 'visualization', 'Visualization', 2, 2),
  ('6', '3', 'supervised', 'Supervised learning', 0, 4),
  ('7', '3', 'algorithms', 'Key algorithms', 1, 5),
  ('8', '3', 'evaluation', 'Model evaluation', 2, 3),
  ('9', '4', 'neural-nets', 'Neural networks', 0, 4),
  ('10', '4', 'cnns', 'Convolutional networks', 1, 4),
  ('11', '4', 'rnns', 'RNNs and sequences', 2, 4),
  ('12', '5', 'text-basics', 'Text basics', 0, 4),
  ('13', '5', 'transformers', 'Transformers', 1, 5),
  ('14', '5', 'llms-genai', 'LLMs and GenAI', 2, 5),
  ('15', '6', 'images', 'Images and preprocessing', 0, 4),
  ('16', '6', 'vision-models', 'Vision models', 1, 3),
  ('17', '7', 'serving', 'Serving models', 0, 5),
  ('18', '8', 'pipeline', 'Pipelines and monitoring', 0, 7),
  ('19', '9', 'project', 'Capstone project', 0, 14)
ON CONFLICT (id) DO NOTHING;

-- Python > Libraries (topic 2)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('4', '2', 'note', 'NumPy in a nutshell',
   'NumPy gives you fast arrays and math in Python. Use ndarray for vectors and matrices; vectorize loops instead of writing for-loops. It is the foundation for Pandas and most ML libraries.' || E'\n\n' || 'Read: https://numpy.org/doc/stable/user/quickstart.html',
   'NumPy gives you fast arrays and numerical math in Python. Use ndarray for vectors and matrices; vectorize loops instead of writing for-loops. It is the foundation for Pandas and most ML libraries. Once you are comfortable with NumPy, data manipulation and model code will make much more sense.',
   'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', NULL, 0),
  ('5', '2', 'short', 'Pandas DataFrames',
   'Pandas DataFrames are tables: rows and columns, load CSV with read_csv(), filter with boolean indexing, group by with groupby(). Essential for data prep before ML.' || E'\n\n' || 'Read: https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html',
   'Pandas DataFrames are tables: rows and columns. Load CSV with read_csv(), filter with boolean indexing, and aggregate with groupby(). Essential for data prep before ML. Most real-world data comes in as tables; Pandas is the standard way to clean and explore it in Python.',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', NULL, 1),
  ('6', '2', 'note', 'Matplotlib and Seaborn',
   'Matplotlib: low-level plotting (plot, scatter, bar). Seaborn: higher-level, great for distributions and correlations (histplot, pairplot, heatmap). Use both for EDA and reports.' || E'\n\n' || 'Read: https://matplotlib.org/stable/tutorials/introductory/quick_start.html',
   'Matplotlib is low-level plotting: plot, scatter, bar. Seaborn is higher-level and great for distributions and correlations: histplot, pairplot, heatmap. Use both for EDA and reports. Visualizing data before modeling helps you spot problems and choose the right approach.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Data > Data loading (topic 3)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('7', '3', 'note', 'Loading CSV and Excel',
   'Use pandas: read_csv() for CSV, read_excel() for Excel. Set index_col, parse_dates, and handle encoding (encoding="utf-8"). Always inspect with .head() and .dtypes.' || E'\n\n' || 'Read: https://pandas.pydata.org/docs/user_guide/io.html',
   'Use pandas read_csv() for CSV and read_excel() for Excel. Set index_col, parse_dates, and handle encoding. Always inspect with .head() and .dtypes so you understand the data before modeling. Loading data correctly saves time later.',
   'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', NULL, 0),
  ('8', '3', 'short', 'APIs and JSON',
   'Use requests.get(url), then .json() to get a dict/list. Normalize nested JSON with json_normalize or flatten by hand. Store in a DataFrame for analysis.' || E'\n\n' || 'Read: https://requests.readthedocs.io/en/stable/',
   'Use requests.get(url) then .json() to get data. Normalize nested JSON with json_normalize or by hand. Store in a DataFrame for analysis. Many datasets and services expose JSON APIs; this is how you bring that data into your pipeline.',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', NULL, 1),
  ('9', '3', 'note', 'Databases and SQL',
   'Connect with sqlalchemy or pandas read_sql(). Write SQL for SELECT, WHERE, JOIN, GROUP BY. For large data use chunking or push down filters. SQL is a core skill for data roles.' || E'\n\n' || 'Read: https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html',
   'Connect with sqlalchemy or pandas read_sql(). Write SQL for SELECT, WHERE, JOIN, GROUP BY. For large data use chunking or push down filters. SQL is a core skill for data and analytics roles.',
   'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Data > EDA (topic 4)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('10', '4', 'note', 'Summary statistics',
   'Use .describe() for mean, std, min, max, quartiles. Check .info() for dtypes and nulls. Correlations: df.corr(). Always understand scale and distribution before modeling.' || E'\n\n' || 'Read: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html',
   'Use .describe() for mean, std, min, max, quartiles. Check .info() for dtypes and nulls. Correlations: df.corr(). Always understand scale and distribution before modeling so you choose the right approach and spot issues early.',
   'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80', NULL, 0),
  ('11', '4', 'short', 'Distributions and skew',
   'Histograms and KDE show shape; skewness affects which models work. Log transform for right-skewed data. Check for multimodality and outliers.' || E'\n\n' || 'Read: https://seaborn.pydata.org/tutorial/distributions.html',
   'Histograms and KDE show the shape of your data. Skewness affects which models work well. Use log transform for right-skewed data. Check for multimodality and outliers before modeling.',
   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', NULL, 1),
  ('12', '4', 'note', 'Missing values',
   'Detect with .isna().sum(). Strategies: drop (dropna), fill with mean/median/mode, or impute with a model. Never ignore missingness—it can bias results.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/impute.html',
   'Detect missing values with .isna().sum(). Strategies: drop with dropna(), fill with mean/median/mode, or impute with a model. Never ignore missingness—it can bias your results and hurt model performance.',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Data > Visualization (topic 5)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('13', '5', 'short', 'Choosing the right chart',
   'Bar: categories. Line: time series. Scatter: two numeric variables. Histogram: distribution. Heatmap: matrix or correlation. Match the chart to the question you are answering.' || E'\n\n' || 'Read: https://www.data-to-viz.com/',
   'Bar charts for categories, line for time series, scatter for two numeric variables, histogram for distribution, heatmap for matrix or correlation. Match the chart to the question you are answering so your audience gets the message quickly.',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', NULL, 0),
  ('14', '5', 'note', 'Seaborn for EDA',
   'sns.pairplot() for multi-column relationships. sns.heatmap(corr) for correlations. sns.boxplot() and sns.violinplot() for distributions by group. Great for reports and notebooks.' || E'\n\n' || 'Read: https://seaborn.pydata.org/tutorial/relational.html',
   'Use sns.pairplot() for multi-column relationships, sns.heatmap(corr) for correlations, sns.boxplot() and sns.violinplot() for distributions by group. Great for EDA and presenting findings in reports.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 1),
  ('15', '5', 'note', 'Plotly and interactivity',
   'Plotly (plotly.express) gives interactive zoom, hover, and filters. Use for dashboards and web apps. Start with px.scatter, px.line, px.histogram; same logic as matplotlib/Seaborn.' || E'\n\n' || 'Read: https://plotly.com/python/plotly-express/',
   'Plotly (plotly.express) gives interactive zoom, hover, and filters. Use it for dashboards and web apps. Start with px.scatter, px.line, px.histogram; same logic as matplotlib and Seaborn but interactive.',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- ML > Supervised (topic 6)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('16', '6', 'note', 'Regression vs classification',
   'Regression: predict a number (e.g. price). Classification: predict a category (e.g. spam/not). Same workflow: features X, target y, train a model, evaluate. Choose metric: MSE/MAE for regression, accuracy/F1 for classification.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/supervised_learning.html',
   'Regression predicts a number (e.g. price); classification predicts a category (e.g. spam or not). Same workflow: features X, target y, train a model, evaluate. Choose the right metric: MSE/MAE for regression, accuracy or F1 for classification.',
   'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', NULL, 0),
  ('17', '6', 'short', 'Train and test split',
   'Use train_test_split(X, y, test_size=0.2, random_state=42). Train only on train set; evaluate on test set. Never let test data influence training (no leakage).' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/cross_validation.html',
   'Use train_test_split to split data. Train only on the train set and evaluate on the test set. Never let test data influence training—that is leakage and gives overly optimistic results.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 1),
  ('18', '6', 'note', 'Overfitting and underfitting',
   'Overfitting: model memorizes train data, poor on test. Underfitting: too simple, poor everywhere. Fix overfitting with more data, simpler model, or regularization. Fix underfitting with more features or a richer model.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/auto_examples/model_selection/plot_underfitting_overfitting.html',
   'Overfitting means the model memorizes train data and does poorly on test data. Underfitting means the model is too simple. Fix overfitting with more data, a simpler model, or regularization. Fix underfitting with more features or a richer model.',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- ML > Algorithms (topic 7)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('19', '7', 'note', 'Linear and logistic regression',
   'Linear regression: fit a line/plane (minimize MSE). Logistic regression: probability for binary classification (sigmoid). Both are interpretable and fast. Start here before trying trees or neural nets.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/linear_model.html',
   'Linear for numbers, logistic for binary class. Interpretable and fast.',
   'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', NULL, 0),
  ('20', '7', 'short', 'Decision trees and forests',
   'Decision tree: split on features, interpretable but overfits. Random forest: many trees, averaged—robust and accurate. XGBoost/LightGBM: gradient boosting, often win tabular competitions.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/tree.html',
   'Trees: interpretable; forests and boosting: accurate and robust.',
   'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80', NULL, 1),
  ('21', '7', 'note', 'SVM and k-NN',
   'SVM: find a boundary that maximizes margin; kernel trick for non-linear. k-NN: predict from k nearest neighbors; simple but slow at inference. Use scaling (StandardScaler) for both.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/svm.html',
   'SVM: max margin + kernels; k-NN: neighbors. Scale features.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- ML > Evaluation (topic 8)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('22', '8', 'note', 'Accuracy, precision, recall, F1',
   'Accuracy: overall correct. For imbalanced data use precision (of predicted positive, how many correct), recall (of actual positive, how many found), F1 (harmonic mean). Choose by business cost of false positives vs false negatives.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/model_evaluation.html',
   'Accuracy, precision, recall, F1. Use the right metric for imbalance.',
   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', NULL, 0),
  ('23', '8', 'short', 'Cross-validation',
   'K-fold: split data into K parts, train on K-1, validate on 1; rotate. Use cross_val_score() for robust estimates. Prefer stratified for classification so each fold has similar class balance.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/cross_validation.html',
   'K-fold: rotate train/validate; stratified for classification.',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', NULL, 1),
  ('24', '8', 'note', 'ROC and AUC',
   'ROC curve: TPR vs FPR at different thresholds. AUC: area under ROC; 0.5 = random, 1.0 = perfect. Use when you care about ranking or threshold choice; use precision-recall when positive class is rare.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html',
   'ROC curve and AUC; use PR curve when positives are rare.',
   'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Deep Learning > Neural nets (topic 9)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('25', '9', 'note', 'From perceptron to MLP',
   'Perceptron: one neuron, linear then activation. MLP: layers of neurons; each layer is linear + activation. Deeper networks can learn complex functions. Use ReLU; initialize weights carefully.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html',
   'Perceptron → MLP: layers, ReLU, good initialization.',
   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80', NULL, 0),
  ('26', '9', 'short', 'Backpropagation',
   'Backprop: chain rule to compute gradients of the loss w.r.t. every weight. Gradient descent updates weights to minimize loss. All frameworks (PyTorch, TensorFlow) do this automatically with autograd.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/beginner/basics/autograd_tutorial.html',
   'Backprop: chain rule for gradients; autograd in PyTorch/TF.',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', NULL, 1),
  ('27', '9', 'note', 'Training loops and optimizers',
   'Loop: forward pass, loss, backward pass, optimizer.step(). Optimizers: SGD, Adam (adaptive lr). Use learning rate scheduling and early stopping. Monitor train vs val loss for overfitting.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html',
   'Forward, loss, backward, step. Adam, LR scheduling, early stop.',
   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Deep Learning > CNNs (topic 10)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('28', '10', 'note', 'Convolutions and filters',
   'Convolution: slide a small filter over the image to detect edges, textures, patterns. Stack layers to get higher-level features. Pooling (e.g. max pool) reduces size and adds invariance.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/beginner/introyt/vision_tutorial.html',
   'Convolutions detect patterns; pooling reduces size.',
   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80', NULL, 0),
  ('29', '10', 'short', 'CNN architectures',
   'LeNet, AlexNet, VGG, ResNet: each added depth and tricks (skip connections in ResNet). Use pretrained models (e.g. torchvision.models) and fine-tune on your data instead of training from scratch.' || E'\n\n' || 'Read: https://pytorch.org/vision/stable/models.html',
   'ResNet, VGG; use pretrained and fine-tune.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 1),
  ('30', '10', 'note', 'Transfer learning',
   'Take a model trained on ImageNet (or similar), replace the head with your class count, freeze backbone and train head first, then optionally unfreeze and fine-tune. Saves time and data.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html',
   'Pretrained backbone, new head, freeze then fine-tune.',
   'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Deep Learning > RNNs (topic 11)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('31', '11', 'note', 'RNNs and sequences',
   'RNN: process sequence step by step, hidden state carries information. Good for time series and text. Vanilla RNNs suffer from vanishing gradients; use LSTM or GRU in practice.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/beginner/sequence_models_tutorial.html',
   'RNN: step-by-step; LSTM/GRU for long sequences.',
   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80', NULL, 0),
  ('32', '11', 'short', 'LSTM and GRU',
   'LSTM: gates (forget, input, output) control what is remembered. GRU: simpler, similar performance. Both fix vanishing gradients. Use for sequence classification or next-step prediction.' || E'\n\n' || 'Read: https://pytorch.org/docs/stable/generated/torch.nn.LSTM.html',
   'LSTM/GRU: gates for long-range dependency.',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', NULL, 1),
  ('33', '11', 'note', 'Seq2seq and attention',
   'Seq2seq: encoder RNN → context → decoder RNN (e.g. translation). Attention: decoder looks at all encoder states, not just the last—enables long sequences. Foundation for transformers.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/intermediate/seq2seq_translation_tutorial.html',
   'Encoder-decoder; attention over encoder states.',
   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- NLP > Text basics (topic 12)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('34', '12', 'note', 'Tokenization',
   'Split text into tokens: words, subwords (BPE, WordPiece), or chars. Vocabulary maps token → id. Libraries: tokenizers, Hugging Face. Choice affects model size and handling of rare words.' || E'\n\n' || 'Read: https://huggingface.co/docs/transformers/tokenizer_summary',
   'Tokens: words, subwords, or chars; vocabulary to ids.',
   'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', NULL, 0),
  ('35', '12', 'short', 'Embeddings',
   'Embedding: dense vector for each token. Learned (e.g. Word2Vec, or from model) or static. Similar words have similar vectors. Input to neural nets is usually embedding → layers.' || E'\n\n' || 'Read: https://pytorch.org/tutorials/beginner/nlp/word_embeddings_tutorial.html',
   'Dense vectors per token; similar words, similar vectors.',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', NULL, 1),
  ('36', '12', 'note', 'Bag of words and TF-IDF',
   'Bag of words: count token frequencies. TF-IDF: weight by importance across documents. Simple baselines for classification and search. Often combined with Naive Bayes or linear models.' || E'\n\n' || 'Read: https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction',
   'BoW and TF-IDF: simple, strong baselines for text.',
   'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- NLP > Transformers (topic 13)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('37', '13', 'note', 'Attention is all you need',
   'Transformers: self-attention over the sequence, no recurrence. Query, key, value; scaled dot-product attention. Positional encoding for order. Enables parallelization and long context.' || E'\n\n' || 'Read: https://arxiv.org/abs/1706.03762',
   'Self-attention, Q/K/V; no recurrence, parallel, long context.',
   'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80', NULL, 0),
  ('38', '13', 'short', 'BERT and GPT',
   'BERT: bidirectional, good for understanding (classification, NER, QA). GPT: autoregressive, good for generation. Both pretrained on large text; fine-tune on your task with a head.' || E'\n\n' || 'Read: https://huggingface.co/docs/transformers/model_doc/bert',
   'BERT: understanding; GPT: generation. Fine-tune with a head.',
   'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', NULL, 1),
  ('39', '13', 'note', 'Fine-tuning and adapters',
   'Fine-tune: update all (or top) layers on your data. Adapters/LoRA: small trainable modules, freeze backbone—faster and less data. Always use a validation set and early stopping.' || E'\n\n' || 'Read: https://huggingface.co/docs/transformers/training',
   'Full fine-tune or adapters/LoRA; validate and early stop.',
   'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- NLP > LLMs and GenAI (topic 14)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('40', '14', 'note', 'Prompting basics',
   'Prompt = instruction + context + format. Few-shot: include examples in the prompt. Zero-shot: just the task. Iterate on prompts; use clear instructions and consistent format. Temperature controls randomness.' || E'\n\n' || 'Read: https://www.promptingguide.ai/',
   'Prompt = instruction + context; few-shot vs zero-shot; temperature.',
   'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', NULL, 0),
  ('41', '14', 'short', 'RAG: retrieval-augmented generation',
   'RAG: retrieve relevant docs (e.g. with embeddings + search), add them to the prompt, then generate. Reduces hallucination and keeps model up to date. Use a vector store (e.g. FAISS, Pinecone).' || E'\n\n' || 'Read: https://www.pinecone.io/learn/retrieval-augmented-generation/',
   'Retrieve docs, add to prompt, generate. Cuts hallucination.',
   'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', NULL, 1),
  ('42', '14', 'note', 'Tools and agents',
   'Agents: LLM decides which tool to call (search, code, API), then acts on the result. ReAct and similar: thought, action, observation loop. Use for question answering and task automation.' || E'\n\n' || 'Read: https://langchain-ai.github.io/langgraph/',
   'Agents: LLM + tools; thought, action, observation.',
   'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Computer Vision > Images (topic 15)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('43', '15', 'note', 'Pixels and color channels',
   'Image = array of shape (H, W) or (H, W, C). RGB: 3 channels. Normalize pixel values (e.g. 0–1 or ImageNet mean/std). Shape and dtype must match model input.' || E'\n\n' || 'Read: https://pytorch.org/vision/stable/transforms.html',
   'Image = (H, W, C); normalize; match model input shape.',
   'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80', NULL, 0),
  ('44', '15', 'short', 'Data augmentation',
   'Augment to increase diversity: flip, rotate, crop, color jitter, blur. Use transforms that preserve label. Train with augmentation; eval without. torchvision.transforms or Albumentations.' || E'\n\n' || 'Read: https://albumentations.ai/',
   'Flip, rotate, crop, color; preserve label; use at train only.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 1),
  ('45', '15', 'note', 'Preprocessing pipelines',
   'Pipeline: load → resize → crop → normalize → tensor. Same for train (with augment) and inference (no augment). Save preprocessing with the model so deployment matches training.' || E'\n\n' || 'Read: https://pytorch.org/vision/stable/models.html',
   'Load, resize, crop, normalize; same pipeline in deploy.',
   'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Computer Vision > Vision models (topic 16)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('46', '16', 'note', 'CNN for image classification',
   'Standard flow: CNN backbone (ResNet, EfficientNet) → global pool → classifier head. Use pretrained; fine-tune on your dataset. Balance dataset size and model size to avoid overfitting.' || E'\n\n' || 'Read: https://pytorch.org/vision/stable/models.html',
   'Backbone + pool + head; pretrained, then fine-tune.',
   'https://images.unsplash.com/photo-1558618047-3c56a8d8e4c5?w=800&q=80', NULL, 0),
  ('47', '16', 'short', 'Object detection intro',
   'Detection: classify and localize (bounding box). Two-stage: R-CNN (region proposals then classify). One-stage: YOLO, RetinaNet (dense predictions). Use COCO pretrained; fine-tune on your classes.' || E'\n\n' || 'Read: https://pytorch.org/vision/stable/models.html#object-detection',
   'Two-stage (R-CNN) vs one-stage (YOLO); COCO pretrained.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 1)
ON CONFLICT (id) DO NOTHING;

-- Deployment > Serving (topic 17)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('48', '17', 'note', 'REST API for models',
   'Wrap model in a REST API: receive input (JSON or form), run inference, return prediction. Use FastAPI or Flask. Add validation, rate limits, and logging. Return errors with proper status codes.' || E'\n\n' || 'Read: https://fastapi.tiangolo.com/',
   'FastAPI/Flask: validate input, run inference, return JSON.',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', NULL, 0),
  ('49', '17', 'short', 'Containers and Docker',
   'Docker: package app + model + dependencies in an image. docker build, docker run. Ensures same environment everywhere. Use for local dev and cloud deployment (ECS, Cloud Run, etc.).' || E'\n\n' || 'Read: https://docs.docker.com/get-started/',
   'Docker: image = app + model + deps; same env everywhere.',
   'https://images.unsplash.com/photo-1612831455749-a470715a7567?w=800&q=80', NULL, 1),
  ('50', '17', 'note', 'Cloud deployment',
   'Options: serverless (Lambda, Cloud Functions), containers (ECS, Cloud Run), or VMs. Consider latency, cost, and scaling. Use managed services for databases and queues. Monitor with logs and metrics.' || E'\n\n' || 'Read: https://cloud.google.com/ai-platform/docs',
   'Serverless vs containers; managed DBs; monitor logs and metrics.',
   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- MLOps > Pipeline (topic 18)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('51', '18', 'note', 'Versioning data and models',
   'Version datasets (DVC, LakeFS) and models (MLflow, Weights & Biases). Reproducibility: same code + data version → same model. Tag releases and document changes.' || E'\n\n' || 'Read: https://mlflow.org/docs/latest/index.html',
   'Version data and models; reproducibility = code + data + tag.',
   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', NULL, 0),
  ('52', '18', 'short', 'CI/CD for ML',
   'CI: run tests, lint, train on small data. CD: build image, run eval, deploy to staging then prod. Use pipelines (GitHub Actions, GitLab CI). Gate deploys on metrics and tests.' || E'\n\n' || 'Read: https://docs.github.com/en/actions',
   'CI: test, lint, train; CD: build, eval, deploy. Gate on metrics.',
   'https://images.unsplash.com/photo-1612831455749-a470715a7567?w=800&q=80', NULL, 1),
  ('53', '18', 'note', 'Monitoring and drift',
   'Monitor latency, throughput, and errors. Track feature and prediction distributions; alert on drift. Retrain when performance drops or data shifts. Log inputs and outputs for debugging.' || E'\n\n' || 'Read: https://evidentlyai.com/',
   'Monitor latency and distributions; drift alerts; retrain when needed.',
   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;

-- Capstone > Project (topic 19)
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('54', '19', 'note', 'Scoping the project',
   'Define problem, success metric, and scope. Get a small dataset and baseline quickly. Iterate: data → model → eval → deploy. Document assumptions and limitations.' || E'\n\n' || 'Read: https://ml-ops.org/',
   'Problem, metric, scope; baseline first; iterate.',
   'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', NULL, 0),
  ('55', '19', 'short', 'Data and model',
   'Collect and clean data; split train/val/test. Train and tune; track experiments. Choose the simplest model that meets the metric. Document preprocessing and hyperparameters.' || E'\n\n' || 'Read: https://wandb.ai/',
   'Data pipeline; train/tune; simplest model that works.',
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', NULL, 1),
  ('56', '19', 'note', 'Deploy and iterate',
   'Deploy to staging; run A/B test or shadow mode. Monitor and fix issues. Plan for retraining and model updates. Write a short report: problem, approach, results, and next steps.' || E'\n\n' || 'Read: https://www.mlflow.org/',
   'Staging, monitor, retrain; document and share results.',
   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;
