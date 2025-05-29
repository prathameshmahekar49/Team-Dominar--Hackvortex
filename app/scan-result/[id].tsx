import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, Check, AlertTriangle, Info, Clock, AlertCircle, ArrowLeft } from 'lucide-react-native';
import { useScan } from '@/hooks/useScan';
import { NutrientCard } from '@/components/NutrientCard';
import { AdditiveItem } from '@/components/AdditiveItem';
import { TabButton } from '@/components/TabButton';
import { usePreferences } from '@/hooks/usePreferences';
import Colors from '@/constants/Colors';

export default function ScanResultScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getScanById } = useScan();
  const { userPreferences } = usePreferences();
  const [activeTab, setActiveTab] = useState('summary');
  
  const scan = getScanById(id as string);
  
  if (!scan) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Check for user's preferred ingredients to avoid
  const userAvoidIngredients = scan.ingredients.filter(ingredient => 
    userPreferences.some(pref => 
      pref.type === 'avoid' && pref.ingredient.toLowerCase() === ingredient.name.toLowerCase()
    )
  );

  const userWantIngredients = scan.ingredients.filter(ingredient => 
    userPreferences.some(pref => 
      pref.type === 'want' && pref.ingredient.toLowerCase() === ingredient.name.toLowerCase()
    )
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.neutral[900]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Results</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productCard}>
          <Text style={styles.productName}>{scan.productName}</Text>
          <Text style={styles.productInfo}>
            {scan.brand} • {scan.weight}
          </Text>
          
          <View style={styles.scanTimeContainer}>
            <Clock size={14} color={Colors.neutral[700]} />
            <Text style={styles.scanTime}>
              Scanned {new Date(scan.scanDate).toLocaleString()}
            </Text>
          </View>
          
          {userAvoidIngredients.length > 0 && (
            <View style={styles.warningCard}>
              <AlertCircle size={20} color={Colors.error[500]} />
              <View style={styles.warningTextContainer}>
                <Text style={styles.warningTitle}>Contains ingredients you avoid</Text>
                <Text style={styles.warningText}>
                  {userAvoidIngredients.map(i => i.name).join(', ')}
                </Text>
              </View>
            </View>
          )}

          {userWantIngredients.length > 0 && (
            <View style={styles.successCard}>
              <AlertCircle size={20} color={Colors.success[500]} />
              <View style={styles.successTextContainer}>
                <Text style={styles.successTitle}>Contains ingredients you want</Text>
                <Text style={styles.successText}>
                  {userWantIngredients.map(i => i.name).join(', ')}
                </Text>
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.tabsContainer}>
          <TabButton 
            title="Summary" 
            active={activeTab === 'summary'} 
            onPress={() => setActiveTab('summary')} 
          />
          <TabButton 
            title="Additives" 
            active={activeTab === 'additives'} 
            onPress={() => setActiveTab('additives')} 
            badge={scan.additives.length}
          />
          <TabButton 
            title="Full Ingredients" 
            active={activeTab === 'ingredients'} 
            onPress={() => setActiveTab('ingredients')} 
          />
        </View>
        
        {activeTab === 'summary' && (
          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>Nutritional Summary</Text>
            
            <View style={styles.nutritionContainer}>
              <NutrientCard 
                title="Protein" 
                value={scan.nutrition.protein} 
                unit="g"
                type="positive"
              />
              <NutrientCard 
                title="Sugar" 
                value={scan.nutrition.sugar} 
                unit="g"
                type="negative"
              />
              <NutrientCard 
                title="Salt" 
                value={scan.nutrition.salt} 
                unit="g"
                type="negative"
              />
              <NutrientCard 
                title="Calories" 
                value={scan.nutrition.calories} 
                unit="kcal"
                type="neutral"
              />
            </View>
            
            <View style={styles.highlightsContainer}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              
              <View style={styles.highlights}>
                {scan.positives.length > 0 ? (
                  <View style={styles.highlightCard}>
                    <View style={[styles.highlightIcon, styles.positiveIcon]}>
                      <Check size={18} color="#fff" />
                    </View>
                    <View style={styles.highlightContent}>
                      <Text style={styles.highlightTitle}>Positives</Text>
                      <Text style={styles.highlightText}>{scan.positives.join(', ')}</Text>
                    </View>
                  </View>
                ) : null}
                
                {scan.negatives.length > 0 ? (
                  <View style={styles.highlightCard}>
                    <View style={[styles.highlightIcon, styles.negativeIcon]}>
                      <X size={18} color="#fff" />
                    </View>
                    <View style={styles.highlightContent}>
                      <Text style={styles.highlightTitle}>Negatives</Text>
                      <Text style={styles.highlightText}>{scan.negatives.join(', ')}</Text>
                    </View>
                  </View>
                ) : null}
                
                {scan.cautions.length > 0 ? (
                  <View style={styles.highlightCard}>
                    <View style={[styles.highlightIcon, styles.cautionIcon]}>
                      <AlertTriangle size={18} color="#fff" />
                    </View>
                    <View style={styles.highlightContent}>
                      <Text style={styles.highlightTitle}>Cautions</Text>
                      <Text style={styles.highlightText}>{scan.cautions.join(', ')}</Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'additives' && (
          <View style={styles.additivesContainer}>
            {scan.additives.length === 0 ? (
              <View style={styles.emptyState}>
                <Info size={40} color={Colors.secondary[500]} />
                <Text style={styles.emptyStateTitle}>No Additives Found</Text>
                <Text style={styles.emptyStateText}>This product doesn't contain any additives</Text>
              </View>
            ) : (
              <>
                <View style={styles.additiveLegend}>
                  <Text style={styles.additiveLegendText}>Risk Level:</Text>
                  <View style={styles.additiveLegendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.primary[500] }]} />
                    <Text style={styles.legendText}>No Risk</Text>
                  </View>
                  <View style={styles.additiveLegendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.secondary[500] }]} />
                    <Text style={styles.legendText}>Good</Text>
                  </View>
                  <View style={styles.additiveLegendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.accent[500] }]} />
                    <Text style={styles.legendText}>Risky</Text>
                  </View>
                  <View style={styles.additiveLegendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.error[500] }]} />
                    <Text style={styles.legendText}>Hazardous</Text>
                  </View>
                </View>
                {scan.additives.map((additive, index) => (
                  <AdditiveItem key={index} additive={additive} />
                ))}
              </>
            )}
          </View>
        )}
        
        {activeTab === 'ingredients' && (
          <View style={styles.ingredientsContainer}>
            <Text style={styles.ingredientsText}>{scan.fullIngredientsList}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
  },
  backButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  productCard: {
    backgroundColor: Colors.neutral[50],
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  productInfo: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
    marginBottom: 12,
  },
  scanTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scanTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  summaryContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 12,
  },
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  highlightsContainer: {
    marginTop: 8,
  },
  highlights: {
    gap: 12,
  },
  highlightCard: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[50],
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  highlightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  positiveIcon: {
    backgroundColor: Colors.primary[500],
  },
  negativeIcon: {
    backgroundColor: Colors.error[500],
  },
  cautionIcon: {
    backgroundColor: Colors.accent[500],
  },
  highlightContent: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  highlightText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
    lineHeight: 20,
  },
  additivesContainer: {
    padding: 16,
  },
  additiveLegend: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  additiveLegendText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.neutral[900],
    marginRight: 8,
  },
  additiveLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
  },
  ingredientsContainer: {
    padding: 16,
    backgroundColor: Colors.neutral[50],
    margin: 16,
    borderRadius: 12,
  },
  ingredientsText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[900],
    lineHeight: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral[900],
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.neutral[100],
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.neutral[900],
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary[500],
  },
  warningCard: {
    backgroundColor: Colors.error[50],
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  warningTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.error[700],
    marginBottom: 4,
  },
  warningText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.error[800],
  },
  successCard: {
    backgroundColor: Colors.success[50],
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  successTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  successTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.success[700],
    marginBottom: 4,
  },
  successText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.success[800],
  },
});