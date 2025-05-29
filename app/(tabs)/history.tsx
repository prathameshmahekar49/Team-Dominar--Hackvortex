import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useScan } from '@/hooks/useScan';
import { ScanItem } from '@/components/ScanItem';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { HeaderBar } from '@/components/HeaderBar';
import Colors from '@/constants/Colors';

export default function HistoryScreen() {
  const { recentScans } = useScan();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScans = recentScans.filter(scan => 
    scan.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scan.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderBar title="Scan History" />
      
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search products or ingredients"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {recentScans.length === 0 ? (
        <EmptyState 
          icon="history" 
          title="No Scan History" 
          message="Your scanned product history will appear here"
        />
      ) : filteredScans.length === 0 ? (
        <EmptyState 
          icon="search" 
          title="No Results Found" 
          message={`No products matching "${searchQuery}"`}
        />
      ) : (
        <FlatList
          data={filteredScans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ScanItem scan={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {filteredScans.length} {filteredScans.length === 1 ? 'result' : 'results'}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  resultsCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 12,
  },
});