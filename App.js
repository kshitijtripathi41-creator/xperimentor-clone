import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

// --- Configuration & Mock Data ---
const COLORS = {
  navy: '#004AAD',
  yellow: '#FFDE59',
  white: '#FFFFFF',
  gray: '#F2F2F2',
  text: '#333333',
};

const QUESTS = [
  { id: '1', title: 'Volcanic Eruption', subject: 'Chemistry', time: '20 mins' },
  { id: '2', title: 'Solar Oven', subject: 'Physics', time: '45 mins' },
  { id: '3', title: 'Plant Osmosis', subject: 'Biology', time: '3 days' },
];

export default function App() {
  const [currentView, setCurrentView] = useState('library'); // 'library' or 'quest'
  const [activeQuest, setActiveQuest] = useState(null);
  const [questStep, setQuestStep] = useState(0); // 0: Hypothesis, 1: Experiment, 2: Questbook

  // --- Logic Handlers ---
  const startQuest = (quest) => {
    setActiveQuest(quest);
    setQuestStep(0);
    setCurrentView('quest');
  };

  const nextStep = () => {
    if (questStep < 2) setQuestStep(questStep + 1);
    else setCurrentView('library');
  };

  const exitQuest = () => {
    setCurrentView('library');
    setQuestStep(0);
  };

  // --- Sub-Views ---

  const LibraryView = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MyLibrary</Text>
        <Text style={styles.subtitle}>Choose your next adventure</Text>
      </View>

      <View style={styles.listContainer}>
        {QUESTS.map((quest) => (
          <TouchableOpacity 
            key={quest.id} 
            style={styles.card}
            onPress={() => startQuest(quest)}
          >
            <View style={styles.cardAccent} />
            <View style={styles.cardContent}>
              <Text style={styles.cardSubject}>{quest.subject}</Text>
              <Text style={styles.cardTitle}>{quest.title}</Text>
              <Text style={styles.cardFooter}>Duration: {quest.time}</Text>
            </View>
            <View style={styles.startButton}>
              <Text style={styles.startButtonText}>START</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const QuestEngineView = () => {
    const steps = [
      { title: '1. Hypothesis', content: `What do you think will happen during the ${activeQuest.title} experiment?` },
      { title: '2. Experiment', content: 'Follow the steps provided in your kit to conduct the procedure.' },
      { title: '3. Questbook', content: 'Record your observations. Was your hypothesis correct?' }
    ];

    return (
      <View style={styles.engineContainer}>
        <View style={styles.engineHeader}>
          <TouchableOpacity onPress={exitQuest}>
            <Text style={styles.exitText}>✕ Exit</Text>
          </TouchableOpacity>
          <Text style={styles.engineTitle}>{activeQuest.title}</Text>
          <View style={{ width: 40 }} /> 
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${((questStep + 1) / 3) * 100}%` }]} />
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepLabel}>{steps[questStep].title}</Text>
          <Text style={styles.stepDescription}>{steps[questStep].content}</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={nextStep}>
            <Text style={styles.actionButtonText}>
              {questStep === 2 ? 'COMPLETE QUEST' : 'NEXT STEP'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      {currentView === 'library' ? <LibraryView /> : <QuestEngineView />}
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  header: {
    backgroundColor: COLORS.navy,
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.yellow,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 5,
    opacity: 0.9,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardAccent: {
    width: 8,
    backgroundColor: COLORS.yellow,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardSubject: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.navy,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 4,
  },
  cardFooter: {
    fontSize: 12,
    color: '#666',
  },
  startButton: {
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  startButtonText: {
    color: COLORS.yellow,
    fontWeight: '800',
    fontSize: 12,
  },
  // Quest Engine Styles
  engineContainer: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  engineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  exitText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  engineTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 20,
    borderRadius: 3,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: COLORS.yellow,
    borderRadius: 3,
  },
  stepCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 20,
  },
  stepDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.text,
    lineHeight: 26,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  actionButtonText: {
    color: COLORS.navy,
    fontWeight: '800',
    fontSize: 16,
  },
});
