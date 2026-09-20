import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors' 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  introContainer: {
    height: "50%",
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
  
 scrollView: {
  flex: 1,
},

cardsContainer: {
  alignItems: "center",
  flexDirection: "column",
  gap: 13,
  paddingBottom: 30,
},

buttonGerarCodigo:{

  borderWidth:2,
  borderColor:colors.primary,
  height:"60%",
  borderRadius:5,
  alignItems:"center",
  justifyContent:"center",
  paddingLeft:3,
  paddingRight:3,
  flexDirection:"row"

},

textGerarCodigo:{
  color:colors.primary,
  fontWeight:"bold",
  fontSize:11
  
},

iconRelaod:{
width:20,
height:20
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
    backgroundColor:colors.primary,
   
  },
   textContainerStyleCard:{
    width: "30%",
      alignItems: "flex-start",
    gap: 5,
  },

   titleCard:{
    fontSize: 11,
    fontWeight: "bold",
  },
  descriptionCard:{
    fontSize: 10,
    color: colors.textDescription,
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
picker: {
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
  padding: 0,
  borderWidth: 0,
    ...({ outlineStyle: "none" } as any), 
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