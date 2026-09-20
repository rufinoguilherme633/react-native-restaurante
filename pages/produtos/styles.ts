  import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors'
import Button from '../../componets/Button/Buton';
export const styles = StyleSheet.create({


   container: {
    flex: 1,
    backgroundColor:colors.background,
    
  },

  buttonAdicionar:{

    backgroundColor:colors.primary,
    width:40,
    height:40,
    borderRadius:50,
    alignItems:"center",
    justifyContent:"center",

  marginTop: 20,
   marginBottom:10, 
  marginLeft: 20
 },

 buttonCategoria:{
  backgroundColor:colors.white,
  minWidth:70,
  height: 40,
  paddingLeft:3,
  paddingRight:3,
  alignItems:"center",
  justifyContent:"center",
  borderRadius:5

 },

 imageAdiocionar:{
  width:"40%",
  height:"40%"
 },
  cardsContainer:{
    alignItems: "center",
    flexDirection: "column",
    gap: 13,
    backgroundColor:"green"
  },

   textContainerStyleCard:{
    width: "50%",
flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  },
   cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.white,

    borderRadius: 10,
    width: 300,
    height: 60,

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
    logoCard:{
    height: 40,
    width: 40,
    backgroundColor: colors.primary,
   
  },
})