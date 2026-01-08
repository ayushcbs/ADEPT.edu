import React, { useState } from 'react';
import { Sparkles, BookOpen, Music, Image, ChevronRight, Loader } from 'lucide-react';

const ADEPT = () => {
  const [screen, setScreen] = useState('landing');
  const [selectedAge, setSelectedAge] = useState('');
  const [topic, setTopic] = useState('');
  const [story, setStory] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [learningMode, setLearningMode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showMediaError, setShowMediaError] = useState(false);

  const ages = Array.from({ length: 13 }, (_, i) => i + 6);

  const handleAgeConfirm = () => {
    if (selectedAge) {
      setScreen('learningStyle');
    }
  };

  const handleStorySelect = () => {
    setLearningMode('story');
    setScreen('topic');
  };

  const handleSongSelect = () => {
    setLearningMode('song');
    setScreen('topic');
  };

  const generateStory = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1500,
          messages: [
            {
              role: 'user',
              content: `Explain "${topic}" for a ${selectedAge} year old and create an engaging, fun story that teaches this concept. The story should:
- Be easy to understand for a ${selectedAge} year old
- Use simple language and relatable examples
- Include the key concepts about "${topic}"
- Be entertaining and about 300-400 words
- Have a clear beginning, middle, and end
- Include a lesson or takeaway at the end

Write only the story, no additional commentary.`
            }
          ],
        }),
      });

      const data = await response.json();
      
      // Check for rate limit error
      if (data.error && data.error.type === 'rate_limit_error') {
        setError('Daily limit reached. Please come back tomorrow or upgrade for unlimited access.');
        return;
      }
      
      if (data.content && data.content[0] && data.content[0].text) {
        setStory(data.content[0].text);
        setScreen('result');
      } else {
        setError('Failed to generate story. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.message && err.message.includes('rate_limit')) {
        setError('Daily limit reached. Please come back tomorrow or upgrade for unlimited access.');
      } else {
        setError('Error generating story. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLyrics = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1500,
          messages: [
            {
              role: 'user',
              content: `Write educational song lyrics about "${topic}" for a ${selectedAge} year old. The lyrics should:
- Be fun, catchy, and easy to remember
- Use simple language appropriate for a ${selectedAge} year old
- Teach key concepts about "${topic}"
- Have verses and a chorus
- Be about 200-300 words
- Include rhythm and rhyme
- Be entertaining while educational

Write only the lyrics with clear verse and chorus labels.`
            }
          ],
        }),
      });

      const data = await response.json();
      
      // Check for rate limit error
      if (data.error && data.error.type === 'rate_limit_error') {
        setError('Daily limit reached. Please come back tomorrow or upgrade for unlimited access.');
        return;
      }
      
      if (data.content && data.content[0] && data.content[0].text) {
        setLyrics(data.content[0].text);
        setScreen('song-result');
      } else {
        setError('Failed to generate lyrics. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.message && err.message.includes('rate_limit')) {
        setError('Daily limit reached. Please come back tomorrow or upgrade for unlimited access.');
      } else {
        setError('Error generating lyrics. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #172554, #0f172a, #0f172a)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    centerFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      minHeight: '100vh',
    },
    maxWidth2xl: {
      maxWidth: '672px',
      width: '100%',
    },
    maxWidth3xl: {
      maxWidth: '768px',
      width: '100%',
    },
    logoContainer: {
      width: '96px',
      height: '96px',
      background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
    },
    title: {
      fontSize: '60px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '24px',
      color: '#93c5fd',
      fontWeight: '600',
      marginBottom: '8px',
      textAlign: 'center',
    },
    description: {
      color: '#94a3b8',
      fontSize: '18px',
      textAlign: 'center',
    },
    card: {
      background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
      borderRadius: '24px',
      padding: '48px',
      border: '1px solid #334155',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      marginTop: '64px',
    },
    cardHeading: {
      color: 'white',
      fontSize: '20px',
      marginBottom: '32px',
      fontWeight: '600',
      textAlign: 'center',
    },
    select: {
      width: '100%',
      background: '#334155',
      border: '1px solid #475569',
      borderRadius: '12px',
      padding: '16px 24px',
      color: 'white',
      fontSize: '18px',
      marginBottom: '32px',
      outline: 'none',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      background: 'linear-gradient(to right, #2563eb, #3b82f6)',
      color: 'white',
      fontWeight: 'bold',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s',
    },
    buttonDisabled: {
      background: 'linear-gradient(to right, #334155, #334155)',
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    backButton: {
      color: '#60a5fa',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '32px',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px',
      textAlign: 'center',
    },
    sectionSubtitle: {
      color: '#94a3b8',
      fontSize: '18px',
      textAlign: 'center',
      marginBottom: '48px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
    },
    learningCard: {
      background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid #334155',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer',
      position: 'relative',
    },
    learningCardActive: {
      border: '2px solid #3b82f6',
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 50px rgba(59, 130, 246, 0.2)',
    },
    learningCardDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    iconContainer: {
      width: '80px',
      height: '80px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
    },
    iconPurple: {
      background: 'linear-gradient(to bottom right, #a855f7, #ec4899)',
    },
    iconBlue: {
      background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
    },
    iconYellow: {
      background: 'linear-gradient(to bottom right, #eab308, #ea580c)',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px',
    },
    cardDescription: {
      color: '#94a3b8',
      fontSize: '14px',
      marginBottom: '16px',
    },
    comingSoonOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    comingSoonText: {
      color: 'white',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      background: '#334155',
      border: '1px solid #475569',
      borderRadius: '12px',
      padding: '16px 24px',
      color: 'white',
      fontSize: '18px',
      marginBottom: '24px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    errorText: {
      color: '#f87171',
      fontSize: '14px',
      marginBottom: '24px',
    },
    storyCard: {
      background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid #334155',
      marginBottom: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    storyText: {
      color: '#cbd5e1',
      fontSize: '18px',
      lineHeight: '1.75',
      whiteSpace: 'pre-wrap',
    },
    gridButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '16px',
    },
    secondaryButton: {
      background: '#334155',
      color: 'white',
      fontWeight: '600',
      padding: '12px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    resultTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px',
      textAlign: 'center',
    },
    resultSubtitle: {
      color: '#94a3b8',
      textAlign: 'center',
      marginBottom: '32px',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '400px',
      width: '90%',
      border: '1px solid #334155',
      textAlign: 'center',
    },
    modalTitle: {
      color: '#f87171',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    modalText: {
      color: '#cbd5e1',
      fontSize: '16px',
      marginBottom: '24px',
      lineHeight: '1.5',
    },
    modalButton: {
      background: 'linear-gradient(to right, #2563eb, #3b82f6)',
      color: 'white',
      fontWeight: 'bold',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
    mediaPlayer: {
      background: '#1e293b',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '32px',
      border: '1px solid #334155',
    },
    playButton: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: 'linear-gradient(to right, #2563eb, #3b82f6)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },
    progressBar: {
      width: '100%',
      height: '4px',
      background: '#334155',
      borderRadius: '2px',
      marginTop: '24px',
      overflow: 'hidden',
    },
    progress: {
      width: '0%',
      height: '100%',
      background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
    },
  };

  // Landing Screen
  const LandingScreen = () => (
    <div style={styles.container}>
      <div style={styles.centerFlex}>
        <div style={styles.maxWidth2xl}>
          <div style={{ marginBottom: '32px' }}>
            <div style={styles.logoContainer}>
              <Sparkles style={{ width: '48px', height: '48px', color: 'white' }} />
            </div>
            <h1 style={styles.title}>ADEPT</h1>
            <p style={styles.subtitle}>AI Driven Educational Platform for Teaching</p>
            <p style={styles.description}>Personalized learning experiences for every student</p>
          </div>

          <div style={styles.card}>
            <p style={styles.cardHeading}>Let's get started! How old is the student?</p>
            
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              style={styles.select}
            >
              <option value="">Select age...</option>
              {ages.map((age) => (
                <option key={age} value={age}>
                  {age} years old
                </option>
              ))}
            </select>

            <button
              onClick={handleAgeConfirm}
              disabled={!selectedAge}
              style={{
                ...styles.button,
                ...((!selectedAge) && styles.buttonDisabled)
              }}
              onMouseEnter={(e) => {
                if (selectedAge) e.target.style.background = 'linear-gradient(to right, #1e40af, #2563eb)';
              }}
              onMouseLeave={(e) => {
                if (selectedAge) e.target.style.background = 'linear-gradient(to right, #2563eb, #3b82f6)';
              }}
            >
              Confirm <ChevronRight style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Learning Style Screen
  const LearningStyleScreen = () => (
    <div style={styles.container}>
      <div style={styles.centerFlex}>
        <div style={styles.maxWidth3xl}>
          <button
            onClick={() => setScreen('landing')}
            style={styles.backButton}
            onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
            onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
          >
            ← Change Age
          </button>

          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={styles.sectionTitle}>Choose Your Learning Style</h2>
            <p style={styles.sectionSubtitle}>Select how {selectedAge} year old would like to learn</p>
          </div>

          <div style={styles.grid}>
            {/* Audio Card */}
            <div 
              onClick={handleSongSelect}
              style={{...styles.learningCard, ...styles.learningCardActive}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(168, 85, 247, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{...styles.iconContainer, ...styles.iconPurple}}>
                <Music style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={styles.cardTitle}>Song</h3>
              <p style={styles.cardDescription}>Learn through music</p>
              <button style={{
                ...styles.button,
                padding: '8px',
                fontSize: '16px',
              }}>
                Select
              </button>
            </div>

            {/* Story Card */}
            <div 
              onClick={handleStorySelect}
              style={{...styles.learningCard, ...styles.learningCardActive}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
            >
              <div style={{...styles.iconContainer, ...styles.iconBlue}}>
                <BookOpen style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={styles.cardTitle}>Story</h3>
              <p style={styles.cardDescription}>Learn through storytelling</p>
              <button style={{
                ...styles.button,
                padding: '8px',
                fontSize: '16px',
              }}>
                Select
              </button>
            </div>

            {/* Visual Card */}
            <div style={{...styles.learningCard, ...styles.learningCardDisabled, pointerEvents: 'none'}}>
              <div style={{...styles.iconContainer, ...styles.iconYellow}}>
                <Image style={{ width: '40px', height: '40px', color: 'white' }} />
              </div>
              <h3 style={styles.cardTitle}>Visual</h3>
              <p style={styles.cardDescription}>Learn through images</p>
              <div style={styles.comingSoonOverlay}>
                <span style={styles.comingSoonText}>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Topic Input Screen
  const TopicScreen = () => (
    <div style={styles.container}>
      <div style={styles.centerFlex}>
        <div style={styles.maxWidth2xl}>
          <button
            onClick={() => setScreen('learningStyle')}
            style={styles.backButton}
            onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
            onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
          >
            ← Back
          </button>

          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={styles.sectionTitle}>What would you like to learn about?</h2>
            <p style={styles.sectionSubtitle}>For a {selectedAge} year old</p>
          </div>

          <div style={styles.card}>
            <input
              type="text"
              placeholder="e.g., Photosynthesis, Ancient Rome, How Computers Work..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (learningMode === 'song') {
                    generateLyrics();
                  } else {
                    generateStory();
                  }
                }
              }}
              style={styles.input}
              autoFocus
            />

            {error && (
              <p style={styles.errorText}>{error}</p>
            )}

            <button
              onClick={learningMode === 'song' ? generateLyrics : generateStory}
              disabled={!topic.trim() || isGenerating}
              style={{
                ...styles.button,
                ...((!topic.trim() || isGenerating) && styles.buttonDisabled)
              }}
              onMouseEnter={(e) => {
                if (topic.trim() && !isGenerating) e.target.style.background = 'linear-gradient(to right, #1e40af, #2563eb)';
              }}
              onMouseLeave={(e) => {
                if (topic.trim() && !isGenerating) e.target.style.background = 'linear-gradient(to right, #2563eb, #3b82f6)';
              }}
            >
              {isGenerating ? (
                <>
                  <Loader style={{ width: '24px', height: '24px', animation: 'spin 1s linear infinite' }} />
                  {learningMode === 'song' ? 'Creating Lyrics...' : 'Creating Story...'}
                </>
              ) : (
                <>
                  <Sparkles style={{ width: '24px', height: '24px' }} />
                  {learningMode === 'song' ? 'Generate Song' : 'Generate Story'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Result Screen
  const ResultScreen = () => (
    <div style={{...styles.container, minHeight: '100vh', padding: '24px'}}>
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <button
          onClick={() => {
            setScreen('topic');
            setTopic('');
            setStory('');
          }}
          style={styles.backButton}
          onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
          onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
        >
          ← Learn Something Else
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={styles.resultTitle}>{topic}</h2>
          <p style={styles.resultSubtitle}>A story for {selectedAge} year olds</p>
        </div>

        <div style={styles.storyCard}>
          <p style={styles.storyText}>{story}</p>
        </div>

        <div style={styles.gridButtons}>
          <button 
            style={styles.secondaryButton}
            onMouseEnter={(e) => e.target.style.background = '#475569'}
            onMouseLeave={(e) => e.target.style.background = '#334155'}
          >
            Save Story
          </button>
          <button 
            style={styles.secondaryButton}
            onMouseEnter={(e) => e.target.style.background = '#475569'}
            onMouseLeave={(e) => e.target.style.background = '#334155'}
          >
            Share
          </button>
        </div>

        <button
          onClick={() => {
            setScreen('learningStyle');
            setTopic('');
            setStory('');
          }}
          style={styles.button}
          onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #1e40af, #2563eb)'}
          onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #2563eb, #3b82f6)'}
        >
          New Learning Topic
        </button>
      </div>
    </div>
  );

  // Song Result Screen with Media Player
  const SongResultScreen = () => (
    <div style={{...styles.container, minHeight: '100vh', padding: '24px'}}>
      {showMediaError && (
        <div style={styles.modal} onClick={() => setShowMediaError(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>⚠️ Media Player Not Ready</h3>
            <p style={styles.modalText}>
              The audio playback feature is currently under development. Please enjoy the lyrics below!
            </p>
            <button 
              onClick={() => setShowMediaError(false)}
              style={styles.modalButton}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #1e40af, #2563eb)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #2563eb, #3b82f6)'}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <button
          onClick={() => {
            setScreen('topic');
            setTopic('');
            setLyrics('');
          }}
          style={styles.backButton}
          onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
          onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
        >
          ← Create Another Song
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={styles.resultTitle}>{topic}</h2>
          <p style={styles.resultSubtitle}>A song for {selectedAge} year olds</p>
        </div>

        {/* Media Player */}
        <div style={styles.mediaPlayer}>
          <button 
            style={styles.playButton}
            onClick={() => setShowMediaError(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <div style={styles.progressBar}>
            <div style={styles.progress}></div>
          </div>
        </div>

        {/* Lyrics */}
        <div style={styles.storyCard}>
          <p style={styles.storyText}>{lyrics}</p>
        </div>

        <div style={styles.gridButtons}>
          <button 
            style={styles.secondaryButton}
            onMouseEnter={(e) => e.target.style.background = '#475569'}
            onMouseLeave={(e) => e.target.style.background = '#334155'}
          >
            Save Lyrics
          </button>
          <button 
            style={styles.secondaryButton}
            onMouseEnter={(e) => e.target.style.background = '#475569'}
            onMouseLeave={(e) => e.target.style.background = '#334155'}
          >
            Share
          </button>
        </div>

        <button
          onClick={() => {
            setScreen('learningStyle');
            setTopic('');
            setLyrics('');
          }}
          style={styles.button}
          onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #1e40af, #2563eb)'}
          onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #2563eb, #3b82f6)'}
        >
          New Learning Topic
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      {screen === 'landing' && <LandingScreen />}
      {screen === 'learningStyle' && <LearningStyleScreen />}
      {screen === 'topic' && <TopicScreen />}
      {screen === 'result' && <ResultScreen />}
      {screen === 'song-result' && <SongResultScreen />}
    </>
  );
};

export default ADEPT;