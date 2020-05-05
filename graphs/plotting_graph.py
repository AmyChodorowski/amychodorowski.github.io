# Code followed from:
# https://towardsdatascience.com/how-to-create-a-plotly-visualization-and-embed-it-on-websites-517c1a78568b

import pandas as pd
import plotly.express as px
import plotly.io as pio


def clean_data(df):
    """
    Clean uploaded data
    :param df: pandas DataFrame
    :return: cleaned pandas DataFrame
    """
    df.neighborhood = df.neighborhood.map(
        {1: 'Friedrichshain-Kreuzberg', 2: 'Mitte', 3: 'Pankow', 4: 'Neukölln', 5: 'Charlottenburg-Wilm',
         6: 'Tempelhof - Schöneberg', 7: 'Lichtenberg', 8: 'Treptow - Köpenick', 9: 'Steglitz - Zehlendorf',
         10: 'Reinickendorf', 11: 'Marzahn - Hellersdorf', 12: 'Spandau'})

    df.room_type = df.room_type.map({1: 'Entire home/apt', 2: 'Private room', 3: 'Shared room'})

    yes_no_dict = {0: 'No', 1: 'Yes'}
    df.wifi = df.wifi.map(yes_no_dict)
    df.washer = df.washer.map(yes_no_dict)
    df.cable_tv = df.cable_tv.map(yes_no_dict)
    df.kitchen = df.kitchen.map(yes_no_dict)

    # rename columns
    df.rename(columns={'neighborhood': 'Neighborhood', 'room_type': 'Room Type', 'accommodates': 'Accommodates',
                       'bedrooms': 'Bedrooms', 'number_of_reviews': 'Number of Reviews', 'wifi': 'Wifi',
                       'cable_tv': 'Cable TV',
                       'washer': 'Washer', 'kitchen': 'Kitchen', 'price': 'Price (US Dollars)'}, inplace=True)

    # remove outliers
    df = df[df['Price (US Dollars)'] < 501]

    return df


def create_figure(df):
    """
    Create figure
    :param df: pandas DataFrame
    :return: Plotly figure
    """

    fig = px.scatter(df, x='Neighborhood', y='Price (US Dollars)',
                     size='Accommodates',
                     hover_data=['Bedrooms', 'Wifi', 'Cable TV', 'Kitchen', 'Washer', 'Number of Reviews'],
                     color='Room Type')
    fig.update_layout(template='plotly_white')
    fig.update_layout(title='How much should you charge in a Berlin neighborhood?')

    return fig


df = pd.read_csv('airbnb.csv')
df = clean_data(df)
fig = create_figure(df)
pio.write_html(fig, file='index.html', auto_open=True)
