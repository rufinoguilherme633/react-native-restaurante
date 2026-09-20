import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors' 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white,
  },
  introContainer: {
    height: "50%",
  },
   
  cardsContainer:{
    alignItems: "center",
    flexDirection: "column",
    gap: 13,
  },

  imageProduto:{
    width:30,
    height:30,
    borderRadius:0,
    borderWidth:0,
    backgroundColor:colors.borderInput
  },
buttonIniciarSessao:{
  width: "90%",
  height: 50,
  backgroundColor:colors.primary,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  
},
  textoBotao:{
    color:colors.white,
  fontWeight:"bold"
},


  containerPage:{
    flexDirection:"row",
    backgroundColor:colors.white,
    flex:1,
    paddingTop:30,

  },
  containerCategorias:{
    alignItems:"center",
     width: "20%",
  },

    containerProdutos:{
     width: "80%",
     backgroundColor:colors.background
  },
  
  containerFazerPedido:{
    flexDirection:"row",
    justifyContent:"flex-end",
    height:70,
    gap:20,
    paddingRight:15
  },

   cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    borderRadius: 10,
    width: "80%",

  },
textContainerStyleCard:{
  width:"40%",
  justifyContent:"flex-start",
  alignItems:"flex-start"
},
  buttonContadorPedido:{
    width:35,
    height:35,
    borderRadius:7,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    borderColor:colors.borderInput
  },
  buttonAddPedido:{  
    backgroundColor:colors.primary,
    width:35,
    height:35,
    borderRadius:7,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center"
  },
  buttonSubstractPedido:{
    backgroundColor:colors.textDescription,
    width:35,
    height:35,
    borderRadius:7,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center"

  },
  imageButtonContadorPedido:{
    width:20,
    height:20

  },

buttonFazerPedido:{
  paddingLeft:10,
  paddingRight:10,
  height: 50,
  backgroundColor:colors.primary,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
},
textButtonFazerPedido:{
  color:colors.white,
  fontWeight: "bold",

}
  
})