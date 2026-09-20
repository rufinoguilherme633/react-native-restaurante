  import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors' 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  introContainer: {
    height: "30%",
  },
  logo:{
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: colors.white
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
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    

  },

  titleResulmo:{
    fontSize: 15,
    fontWeight: "bold",
  },
  containerResumoCadastro:{
    
    borderRadius: 10,
    flexGrow: 0,
    width: "90%",
    backgroundColor:colors.white,
    height: 200,
    padding: 20,

  },

  logoCard:{
    height: 30,
    width: 30,
    borderColor:"FFFFFF",
    backgroundColor:colors.background,
    borderWidth: 0,
   marginRight: 10,
   
  },
  

   titleCard:{
    fontSize: 10,
    fontWeight: "bold",
        color:colors.textDescription,

  },
  descriptionCard:{
    fontSize: 14,
    fontWeight: "bold",
    color:colors.black,

  },

  containerInput: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.black,

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


buttonEntrar:{
  width: "90%",
  height: 50,
  backgroundColor:colors.primary,
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