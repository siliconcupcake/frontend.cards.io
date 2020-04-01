import React from 'react'
import './HomePage.css'


import { withStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography
} from '@material-ui/core';

const styles = (theme) => ({
	root: {
	},
	flexGrow: {
		flexGrow: 1,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	card: {
		margin: theme.spacing(0.5),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			"&:last-child": {
				paddingBottom: theme.spacing(1)
			}
		},
		'&:hover': {
			cursor: 'pointer'
		},
	},
	centerChild: {
		textAlign: "center"
	},
	joinListGrid: {
		marginTop: theme.spacing(1),
		marginLeft: 0
	},
	nameTabGrid: {
	},
	nameTabCard: {
		border: '3px solid',
		borderRadius: '6px',
		display: 'flex',
		padding: theme.spacing(0),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			"&:last-child": {
				paddingBottom: theme.spacing(0)
			}
		},
	},
	chipNumberBox: {
		color: "white",
		backgroundColor: theme.palette.secondary.main,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	cardContent: {
		padding: theme.spacing(0),
		paddingBottom: 0,
		"&:last-child": {
			paddingBottom: theme.spacing(0)
		},
	},
	joinBtnContainer: {
		marginTop: theme.spacing(2)
	}
});

const joinGameData = [
	{ position: 1, name: 'Bharath' },
	{ position: 2, name: 'Bharath' },
	{ position: 3, name: 'Bharath' },
	{ position: 4, name: 'Bharath' },
	{ position: 5, name: 'Bharath' },
	{ position: 6, name: 'Bharath' },
];

class JoinGamePage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			position: 0,
			gameCode: ''
		}
	}

	handleNameInputChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}

	handlePositionInputChange = (e) => {
		this.setState({
			position: parseInt(e.target.value)
		})
	}

	handleGameCodeInputChange = (e) => {
		this.setState({
			gameCode: e.target.value
		})
	}

	handleGameCodeSubmit = () => {
		this.props.probeGameRequest(this.state.gameCode)
	}

	joinGame = () => {
		if (
			this.state.position !== 0 &&
			this.state.name !== '' &&
			this.state.gameCode !== ''
		)
			this.props.joinGame(this.state)
	}
	render() {

		const { classes } = this.props;

		return (
			<>
				<Grid container xs={12} xl={12} alignItems="center" >
					<Grid item xs={2}>
					</Grid>
					<Grid container item xs={7} justify="center">
						<TextField
							label="Game Code"
							variant="outlined"
							size="small"
							fullWidth
							color="secondary"
							className={classes.textField}
						/>
					</Grid>
					<Grid item alignItems="center" xs={3} justify="center">
						<Button size="small" variant="contained" color="secondary">
							Peek
						</Button>
					</Grid>
				</Grid>
				<Grid container xs={12} xl={12} className={classes.centerChild}>
				</Grid>
				<Grid container xs={12} xl={12} className={classes.joinListGrid}
					spacing={2}
				>
					{joinGameData.map((player) => (
						<Grid item xs={6} className={classes.nameTabGrid}>
							<Card className={classes.nameTabCard} alignItems="center"
								variant="outlined"
							>
								<Box className={classes.chipNumberBox}>
									{player.position}
								</Box>
								<div className={classes.detail}>
									<CardContent className={classes.cardContent}>
										<Typography
											color="textSecondary"
											component="div"
											gutterBottom
										>
											{player.name}
										</Typography>
									</CardContent>
								</div>
							</Card>
						</Grid>
					))}
					<Grid container xs={12} sm={12} xl={12}
						justify="center"
						className={classes.joinBtnContainer}
					>
						<Button size="small" variant="contained" color="secondary">
							Join
						</Button>
					</Grid>
				</Grid>
			</>
		)
	}
}

export default withStyles(styles)(JoinGamePage)
