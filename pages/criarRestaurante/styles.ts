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
    height: 70,
    width: 70,
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
    color:"#6B7280",
    fontWeight: "bold",

  },

  containerInput: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 10,

    paddingHorizontal: 15,
    marginBottom: 15,
  },

  imageInput: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 12,
  },

  input: {
    flex: 1,
  height: 50,
  fontSize: 16,
  color: "#333333",
  padding: 0,
  borderWidth: 0,
    ...({ outlineStyle: "none" } as any), 
},

buttonEntrar:{
  width: "90%",
  height: 50,
  backgroundColor: colors.primary,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,

},
textButton:{
  color:colors.white,
  fontWeight: "bold",

},


buttonVoltar:{
  width: "90%",
  height: 50,
  borderColor:colors.primary,
  borderWidth: 2,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,

},
textVoltar:{
  color:colors.primary,
  fontWeight: "bold",
}
})