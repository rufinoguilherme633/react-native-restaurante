import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  logo:{

    height: 100,
    width: 100,
    borderRadius: 40,
    borderColor: colors.primary,
    backgroundColor:"#FFF",
    borderWidth: 6,
  }, 
  title:{
    fontSize: 24,
    fontWeight: "bold",
  },
  description:{

    fontSize: 13,
    color: colors.textDescription,
    fontWeight: "bold",
    textAlign: "center"

  }
})