using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Media.Animation;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace WindowsAmourConnect
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private Dictionary<string, Type> pages = new Dictionary<string, Type>()
        {
            {"home", typeof(MainPage) },
            {"login", typeof(LoginPage) },
            {"register", typeof(RegisterPage) }
        };

        public MainPage()
        {
            InitializeComponent();
        }

        private void NavigationViewControl_ItemInvoked(NavigationView sender, NavigationViewItemInvokedEventArgs args)
        {
            if (args.IsSettingsInvoked)
            {
            }
            else
            {
                var itemContainer = args.InvokedItemContainer as NavigationViewItem;

                var itemTag = itemContainer?.Tag as string;

                if (itemTag != null && pages.TryGetValue(itemTag, out Type pageType))
                {
                    Frame.Navigate(pageType);
                }
            }
        }
    }
}
