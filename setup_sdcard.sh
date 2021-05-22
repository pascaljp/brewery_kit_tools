touch /Volumes/boot/ssh

cat > /Volumes/boot/wpa_supplicant.conf <<EOF                                                                                                                                                                                                 
country=JP                                                                                                                                                                                                                                    
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev                                                                                                                                                                                       
update_config=1                                                                                                                                                                                                                               
                                                                                                                                                                                                                                              
network={                                                                                                                                                                                                                                     
  key_mgmt=WPA-PSK                                                                                                                                                                                                                            
  ssid="bioruby"                                                                                                                                                                                                                              
  psk="kumamushi.net"                                                                                                                                                                                                                         
}                                                                                                                                                                                                                                             
EOF                                                                                                                                                                                                                                           

echo Done!
