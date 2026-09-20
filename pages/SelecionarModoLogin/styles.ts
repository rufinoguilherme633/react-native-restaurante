  import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors' 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  introContainer: {
    height: "40%",
  },
  logo:{
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor:colors.white
  }, 
 
  title:{
    fontSize: 24,
    fontWeight: "bold",
  },
  description:{

    fontSize: 13,
    color:colors.textDescription,
    fontWeight: "bold",
    textAlign: "center"

  },
  
 
 
  cardsContainer:{
    alignItems: "center",
    flexDirection: "column",
    gap: 13,
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.background,

    borderRadius: 10,
    width: 350,
    height: 80,

  },

  logoCard:{
    height: 50,
    width: 50,
    backgroundColor: colors.primary,
   
  },
   textContainerStyleCard:{
    width: "50%",
      alignItems: "flex-start",
    gap: 5,
  },

   titleCard:{
    fontSize: 15,
    fontWeight: "bold",
  },
  descriptionCard:{
    fontSize: 10,
    color:colors.textDescription,
    fontWeight: "bold",

  },

})