import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'

import { icons } from "../../constants/"

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPass}
            {...props}
            ></TextInput>
        
        {title === 'Password' && (
        <TouchableOpacity onPress={() => 
        setShowPass(!showPass)}>
            <Image source={!showPass ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
        </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField