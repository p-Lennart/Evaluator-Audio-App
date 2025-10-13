package com.ni121.companionapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class FFTPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext) : List<NativeModule> {
        return listOf(FFTModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext) : List<ViewManager<*, *>> {
        return emptyList()
    }
}
